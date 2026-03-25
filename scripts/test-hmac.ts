import crypto from 'node:crypto';

// The AI Agent Payload matching the supposed AgentPayloadSchema
const payload = {
  id: crypto.randomUUID(),
  slug: "ultimate-boxing-cardio-routine",
  title: "The Ultimate Boxing Cardio Routine for Maximum Fat Burn",
  excerpt: "A 30-minute high-intensity boxing cardio routine designed to maximize fat burn and improve cardiovascular health.",
  status: "pending_review",
  author: "AGENTIC_AI",
  tags: ["Fitness", "Boxing", "Cardio", "Health"],
  mdxContent: `
# The Science of Boxercise

Boxing isn't just about punching bags; it's a full-body cardiovascular workout.

<ScienceBadge title="Metabolic Burn">
Studies show that an hour of intense boxing can burn up to 800-1000 calories, depending on intensity and weight.
</ScienceBadge>

Try this routine at home:

<WorkoutCard 
  title="30-Minute Heavy Bag Drill" 
  duration="30 min" 
  difficulty="Intermediate" 
  exercises={[
    "3 min warm-up jump rope", 
    "3 min jab-cross combos", 
    "3 min power hooks and uppercuts"
  ]}
/>

Remember to stay hydrated!
  `.trim(),
  seo: {
    metaTitle: "Ultimate Boxing Cardio Routine | Burn Fat Fast",
    metaDescription: "Learn how to burn 1000 calories with basic boxing combos. Complete 30-minute heavy bag drill included.",
    keywords: ["boxing", "cardio", "fat burn", "workout", "fitness"]
  }
};

// Convert payload to string for signing and transmission
const payloadString = JSON.stringify(payload);

/**
 * 1. Security (HMAC)
 * Load the secret from the environment variables.
 * Note: middleware.ts uses AGENT_SHARED_SECRET, so we check for both.
 */
const secret = process.env.AGENT_SECRET_KEY || process.env.AGENT_SHARED_SECRET;

if (!secret) {
  console.error("❌ ERROR: AGENT_SHARED_SECRET or AGENT_SECRET_KEY is missing.");
  console.error("Please run the script providing the env var, e.g.:");
  console.error("AGENT_SHARED_SECRET=your_secret_here bun scripts/test-hmac.ts");
  process.exit(1);
}

// Generate the SHA-256 HMAC signature
const signature = crypto
  .createHmac('sha256', secret)
  .update(payloadString)
  .digest('hex');

const signatureHeader = `sha256=${signature}`;

console.log('🔄 Simulating AI Agent "Zero Claw" Post Ingestion...\n');
console.log('📦 Payload Summary:', JSON.stringify({ slug: payload.slug, title: payload.title, status: payload.status }, null, 2));
console.log('🔑 Generated Signature:', signatureHeader, '\n');

/**
 * 2. Execution Logic
 * Send the POST request to the local API endpoint
 */
async function sendToAgentIngest() {
  const url = 'http://localhost:3000/api/agent/ingest';
  
  try {
    console.log(`🚀 Sending POST request to ${url}...`);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hub-signature-256': signatureHeader
      },
      body: payloadString
    });

    console.log(`\n🌐 Response Status: ${response.status} ${response.statusText}`);
    
    // Attempt to log response body
    const responseText = await response.text();
    console.log('📝 Response Body:', responseText || '(empty body)');

    if (response.ok) {
      console.log('\n✅ SUCCESS: The post payload was accepted!');
    } else {
      console.error('\n❌ FAILED: The server rejected the request.');
    }
  } catch (error) {
    console.error('\n💥 NETWORKING ERROR:', error);
    console.error('Make sure your Next.js local server is running on http://localhost:3000');
  }
}

sendToAgentIngest();
