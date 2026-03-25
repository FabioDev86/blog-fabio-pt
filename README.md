# FABIO PT — The Frontline 🥊

**The Frontline** is a high-performance, AI-agent-driven blog platform designed for elite athletic coaching and boxing insights. It features an automated workflow where AI agents ingest content through a secure API, followed by a professional admin approval queue before publication.

![Athletic Dark UI](https://img.shields.io/badge/UI-Athletic--Dark-emerald)
![Next.js 15](https://img.shields.io/badge/Next.js-15-black)
![Tailwind v4](https://img.shields.io/badge/Tailwind-v4-38bdf8)
![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF)
![Vercel KV](https://img.shields.io/badge/Database-Vercel--KV-white)

---

## 🚀 Key Features

- **Agentic Ingestion API**: Secure endpoint for AI agents to submit posts using **HMAC SHA-256** signature verification.
- **Admin Approval Queue**: Custom dashboard for reviewing, approving, or rejecting pending agent submissions.
- **Athletic-Dark Experience**: A premium, high-contrast UI designed for readability and a "pro-sport" look & feel.
- **Dynamic MDX Rendering**: Support for custom technical components like `<WorkoutCard />` (technical tables) and `<ScienceBadge />` (evidence-based popovers).
- **Edge Performance**: Optimized for Vercel with server actions and high-speed data retrieval via Vercel KV (Upstash Redis).

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 (Alpha/Beta) + PostCSS
- **Authentication**: Clerk (Role-based access control for Admins)
- **Database**: Vercel KV / Redis
- **Content**: `next-mdx-remote` for AI-generated MDX
- **Validation**: Zod (Schema-strict payloads)

---

## 🏗 Getting Started

### 1. Requirements
- Node.js 18+
- A Clerk account (for Admin Authentication)
- A Vercel KV (Redis) instance

### 2. Environment Setup
Create a `.env.local` file based on `.env.example`:

```bash
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...

# Database (Vercel KV)
KV_URL=...
KV_REST_API_URL=...
KV_REST_API_TOKEN=...
KV_REST_API_READ_ONLY_TOKEN=...

# Security
AGENT_SECRET_KEY=your_high_entropy_secret_here
```

### 3. Installation
```bash
npm install
```

### 4. Development
```bash
npm run dev
```

---

## 🔒 Security & Workflow

1. **Ingest**: The AI Agent sends a POST request to `/api/agent/ingest`.
2. **Verify**: Middleware verifies the `x-hub-signature-256` header against the payload using HMAC.
3. **Queue**: Valid posts are stored in Vercel KV with `status: "pending_review"`.
4. **Approve**: Admin (verified via Clerk `publicMetadata.role === 'admin'`) approves the post at `/admin/queue`.
5. **Publish**: Post is moved to `status: "published"` and becomes visible on the homepage.

---

## ⚕ Medical Disclaimer

The content provided by this platform is generated via AI agents for informational and educational purposes only. It is not intended as medical advice or as a substitute for the medical advice of a physician. Always consult your doctor before starting any new fitness regimen or high-intensity cardio routine.

---

## 📄 License
© 2026 Fabio Bauleo. All Rights Reserved.
