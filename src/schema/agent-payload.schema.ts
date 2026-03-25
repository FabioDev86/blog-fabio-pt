import { z } from 'zod';

export const ExerciseSchema = z.object({
  name: z.string().min(3),
  sets: z.string().min(1),
  reps: z.string().min(1),
  rpe: z.string().regex(/^[0-9]+$/, "RPE must be a numeric string"),
  rest: z.string().min(2), // e.g., "60s"
});

export const AgentPayloadSchema = z.object({
  id: z.string().uuid("ID must be a valid UUID"),
  title: z.string().min(10, "Title is too short").max(100, "Title is too long"),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),
  excerpt: z.string().max(300, "Excerpt must be under 300 characters"),
  mdxContent: z.string().min(50, "MDX Content is required"),
  // Added mandatory structured workouts for high-quality technical data
  workouts: z.array(z.object({
    title: z.string().min(5),
    exercises: z.array(ExerciseSchema).min(1),
    duration: z.string().optional(),
    difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
  })).min(1, "At least one workout block is required"),
  tags: z.array(z.string()).max(5, "Maximum 5 tags allowed"),
  author: z.literal('AGENTIC_AI'),
  // Agent posts default to pending_review. Admin can manually promote to published.
  status: z.enum(['draft', 'pending_review', 'published']).default('pending_review'),
  seo: z.object({
    metaDescription: z.string().max(160),
    keywords: z.array(z.string()).max(10),
  }).optional(),
  // Ensure metadata is not stripped by Zod
  metadata: z.object({
    agentId: z.string().optional(),
    version: z.string().optional(),
    generatedAt: z.string().datetime().optional()
  }).optional(),
  // Temporal/Context parameter to guide Dynamic Time Awareness
  agentContextDate: z.string().datetime().optional()
});

export type AgentPayload = z.infer<typeof AgentPayloadSchema>;
