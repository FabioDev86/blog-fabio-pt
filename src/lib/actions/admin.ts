'use server';

import { kv } from '@vercel/kv';
import { revalidateTag, revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs/server';

export async function approvePost(slug: string) {
  // 1. Authenticate & Authorize
  const session = await auth();
  if (!session.userId || session.sessionClaims?.metadata?.role !== 'admin') {
    throw new Error('Unauthorized: Admin access required');
  }

  const postKey = `post:${slug}`;
  
  // 2. Fetch post
  const post = await kv.get<any>(postKey);
  if (!post) {
    throw new Error('Post not found in KV store');
  }

  // 3. Update status
  post.status = 'published';
  await kv.set(postKey, post);

  // 4. Revalidate edge cache and admin route
  revalidateTag('blog');
  revalidatePath('/admin/queue');

  return { success: true, slug };
}

export async function deletePost(slug: string) {
  // 1. Authenticate & Authorize
  const session = await auth();
  if (!session.userId || session.sessionClaims?.metadata?.role !== 'admin') {
    throw new Error('Unauthorized: Admin access required');
  }

  const postKey = `post:${slug}`;
  
  // Delete from KV entirely
  await kv.del(postKey);
  // Remove slug from index
  await kv.srem('posts:index', slug);
  
  // Revalidate edge cache and admin route
  revalidateTag('blog');
  revalidatePath('/admin/queue');
  
  return { success: true, slug };
}
