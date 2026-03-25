import crypto from 'node:crypto';

// Use local environment for testing
const API_URL = 'http://localhost:3000/api/agent/ingest';
const AGENT_SECRET = process.env.AGENT_SHARED_SECRET || 'super_secret_test_key_123';

const mockMdx = `
# The Agentic Hypertrophy Protocol
Welcome to the AI-generated training protocol.

<TemporalContext format="season" />

<WorkoutCard 
  title="Push Day Alpha"
  exercises={[
    { name: 'Incline Dumbbell Press', sets: 3, reps: '8-10', rpe: 8, rest: '90s' },
    { name: 'Cable Crossovers', sets: 3, reps: '12-15', rpe: 9, rest: '60s' }
  ]} 
/>

Research shows that volume equates to muscle growth when proximity to failure is adequate.
<ScienceBadge 
  source="Schoenfeld et al., 2019"
  doi_link="https://doi.org/10.1249/MSS.0000000000001764"
  evidence_level="High"
  abstract="Higher training volumes are positively associated with increases in muscle mass."
/>
`;

const payload = {
  id: crypto.randomUUID(),
  title: 'Ultimate Agentic Hypertrophy Guide',
  slug: 'agentic-hypertrophy-guide',
  excerpt: 'A fully automated training module focused on maximum muscle growth.',
  mdxContent: mockMdx.trim(),
  tags: ['hypertrophy', 'push-day', 'agentic'],
  author: 'AGENTIC_AI',
  status: 'pending_review',
  seo: {
    metaDescription: 'An AI-generated guide to maximizing muscle hypertrophy.',
    keywords: ['hypertrophy', 'workout', 'ai']
  },
  agentContextDate: new Date().toISOString()
};

const payloadString = JSON.stringify(payload);

// Create HMAC SHA-256 signature
const hmac = crypto.createHmac('sha256', AGENT_SECRET);
hmac.update(payloadString);
const signature = `sha256=${hmac.digest('hex')}`;

async function runTest() {
  console.log('🚀 Sending mock payload to:', API_URL);
  
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hub-signature-256': signature,
      },
      body: payloadString
    });

    const data = await res.json();
    console.log(`[Status: ${res.status}]`, data);
  } catch (err) {
    console.error('❌ Error hitting ingestion endpoint:', err);
  }
}

runTest();
