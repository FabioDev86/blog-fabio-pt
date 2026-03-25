import { kv } from '@vercel/kv';

async function patchDates() {
  console.log("Starting KV patch...");
  const slugs = await kv.smembers('posts:index');
  
  if (!slugs || slugs.length === 0) {
    console.log("No posts found.");
    return;
  }

  const keys = slugs.map((slug: string) => `post:${slug}`);
  const posts = await kv.mget(...keys);

  for (let i = 0; i < posts.length; i++) {
    const post: any = posts[i];
    if (post) {
      if (!post.metadata) {
        post.metadata = {};
      }
      if (!post.metadata.generatedAt) {
        // Set a date based on the slug to ensure correct chronological sorting
        // ultimate-boxing-cardio-routine -> older
        // neurobiology-peak-performance-boxing -> newer
        if (post.slug.includes('neurobiology')) {
          post.metadata.generatedAt = new Date().toISOString(); // Now
        } else {
          post.metadata.generatedAt = new Date(Date.now() - 86400000).toISOString(); // Yesterday
        }
        
        await kv.set(`post:${post.slug}`, post);
        console.log(`Patched post: ${post.slug} with date ${post.metadata.generatedAt}`);
      } else {
        console.log(`Post ${post.slug} already has a date.`);
      }
    }
  }
  console.log("Patch complete!");
}

patchDates();
