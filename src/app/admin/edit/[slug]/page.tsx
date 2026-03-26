import { kv } from '@vercel/kv';
import { notFound, redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { LiveEditor } from '@/components/admin/LiveEditor';

export const dynamic = 'force-dynamic';

export default async function AdminEditPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as any)?.role;
  
  // Protect the route
  if (role !== 'admin') {
    redirect('/');
  }

  const { slug } = await params;
  
  // Fetch raw post data
  const post = await kv.get<any>(`post:${slug}`);
  
  if (!post) {
    notFound();
  }

  return (
    <div className="bg-[#050505] min-h-screen text-zinc-100 font-sans">
      <LiveEditor post={post} />
    </div>
  );
}
