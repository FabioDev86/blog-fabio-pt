import { NextResponse } from 'next/server';
import { AgentPayloadSchema } from '@/schema/agent-payload.schema';
import { kv } from '@vercel/kv';
import { revalidateTag } from 'next/cache';

// Edge Runtime for maximum performance and low TTFB
export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    // 1. Zod Validation (Throws ZodError if malformed)
    const json = await req.json();
    const payload = AgentPayloadSchema.parse(json);

    // 2. Data Persistence in Vercel KV (Redis)
    // Using a hash map structure: post:{slug}
    const postKey = `post:${payload.slug}`;
    await kv.set(postKey, payload);
    
    // Add to an index set for easy retrieval of all posts (for feed views)
    await kv.sadd('posts:index', payload.slug);

    // 3. Cache Revalidation
    // Triggers Next.js 15 Data Cache revalidation for the 'blog' tag
    // This ensures Edge Nodes serve the fresh content immediately 
    // without rebuilding the entire site
    revalidateTag('blog', 'max');

    return NextResponse.json(
      { success: true, slug: payload.slug, message: 'Article ingested and cache revalidated' },
      { status: 200 }
    );
    
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Payload validation failed', details: error.errors },
        { status: 422 }
      );
    }
    
    console.error('Agent Ingestion Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
