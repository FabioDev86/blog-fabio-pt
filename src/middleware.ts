import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse, type NextRequest } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Initialize Upstash Redis for Edge rate limiting using Vercel KV env vars
const redis = new Redis({
  url: process.env.KV_REST_API_URL || '',
  token: process.env.KV_REST_API_TOKEN || '',
});

// Configure Rate Limiting: 10 requests per hour for the Agent ingest endpoint
const agentRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '1 h'),
  analytics: true,
});

// Route Matchers
const isAdminRoute = createRouteMatcher(['/admin(.*)']);
const isAgentApiRoute = createRouteMatcher(['/api/agent(.*)']);

// HMAC Verification Helper (Edge-compatible Web Crypto API)
async function verifyHmac(req: NextRequest, secret: string) {
  const signature = req.headers.get('x-hub-signature-256');
  if (!signature) return false;

  // Clone request to read body without consuming the stream for the next handler
  const bodyText = await req.clone().text();
  const encoder = new TextEncoder();
  
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );

  const sigHex = signature.replace('sha256=', '');
  const sigBytes = new Uint8Array(
    sigHex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
  );

  try {
    return await crypto.subtle.verify('HMAC', key, sigBytes, encoder.encode(bodyText));
  } catch {
    return false;
  }
}

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // 1. Protect /admin routes using Clerk RBAC
  if (isAdminRoute(req)) {
    const session = await auth();
    
    // Check if user is authenticated
    if (!session.userId) {
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return NextResponse.redirect(signInUrl);
    }
    
    // Check if user has the 'admin' metadata role
    if (session.sessionClaims?.metadata?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // 2. Protect Agent API routes (/api/agent/ingest)
  if (isAgentApiRoute(req)) {
    // 2a. Upstash Rate Limiting
    const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1'; // Next.js 15 removed req.ip, use headers instead
    const { success, limit, remaining, reset } = await agentRateLimit.limit(`agent_limit_${ip}`);
    
    if (!success) {
      return new NextResponse('Rate limit exceeded. Agent is throttled.', {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
        },
      });
    }

    // 2b. HMAC Signature Verification
    const agentSecret = process.env.AGENT_SECRET_KEY;
    if (!agentSecret) {
      console.error('SERVER ERROR: AGENT_SECRET_KEY missing');
      return new NextResponse('Internal Server Error', { status: 500 });
    }

    const isValid = await verifyHmac(req, agentSecret);
    if (!isValid) {
      return new NextResponse('Unauthorized: Invalid HMAC Signature', { status: 401 });
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
