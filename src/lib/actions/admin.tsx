'use server';

import { kv } from '@vercel/kv';
import { revalidateTag, revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs/server';
import React from 'react';

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
  revalidateTag('blog', 'max');
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
  revalidateTag('blog', 'max');
  revalidatePath('/admin/queue');
  
  return { success: true, slug };
}

// === Live Editor Actions ===

export async function syncPreviewContent(slug: string, mdxContent: string) {
  // 1. Authenticate & Authorize
  const session = await auth();
  if (!session.userId || session.sessionClaims?.metadata?.role !== 'admin') {
    throw new Error('Unauthorized: Admin access required');
  }

  // Store the draft in a temporary volatile key for the preview route to consume
  const previewKey = `preview:${slug}`;
  await kv.set(previewKey, { mdxContent }, { ex: 300 }); // Expires in 5 mins
  
  return { success: true };
}

export async function updatePost(slug: string, newData: { title: string, mdxContent: string, status?: 'pending_review' | 'published' }) {
  // 1. Authenticate & Authorize
  const session = await auth();
  if (!session.userId || session.sessionClaims?.metadata?.role !== 'admin') {
    throw new Error('Unauthorized: Admin access required');
  }

  const postKey = `post:${slug}`;
  const post = await kv.get<any>(postKey);
  
  if (!post) {
    throw new Error('Post not found in KV store');
  }

  // Overwrite the specific mutated fields while retaining everything else (tags, author, etc)
  post.title = newData.title;
  post.mdxContent = newData.mdxContent;
  if (newData.status) {
    post.status = newData.status;
  }
  
  await kv.set(postKey, post);
  
  // Hard purge of any stale cache for this route
  revalidateTag('blog', 'max');
  revalidatePath(`/blog/${slug}`);
  revalidatePath('/admin/queue');
  
  return { success: true, slug };
}
