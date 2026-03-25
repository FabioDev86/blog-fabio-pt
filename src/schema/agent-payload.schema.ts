import { z } from 'zod';

export const AgentPayloadSchema = z.object({
  id: z.string().uuid("ID must be a valid UUID"),
  title: z.string().min(10, "Title is too short").max(100, "Title is too long"),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),
  excerpt: z.string().max(300, "Excerpt must be under 300 characters"),
  mdxContent: z.string().min(50, "MDX Content is required"),
  tags: z.array(z.string()).max(5, "Maximum 5 tags allowed"),
  author: z.literal('AGENTIC_AI'),
  // Agent posts default to pending_review. Admin can manually promote to published.
  status: z.enum(['draft', 'pending_review', 'published']).default('pending_review'),
  seo: z.object({
    metaDescription: z.string().max(160),
    keywords: z.array(z.string()).max(10),
  }).optional(),
  // Temporal/Context parameter to guide Dynamic Time Awareness
  agentContextDate: z.string().datetime().optional()
});

export type AgentPayload = z.infer<typeof AgentPayloadSchema>;
