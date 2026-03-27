# FABIO PT — The Frontline 🥊

**The Frontline** is a high-performance, AI-agent-driven blog platform designed for elite athletic coaching and boxing insights. It features an automated workflow where AI agents ingest content through a secure API, followed by a professional admin approval queue with 1:1 parity previews.

![Athletic Dark UI](https://img.shields.io/badge/UI-Athletic--Dark-emerald)
![Next.js 16.2.1](https://img.shields.io/badge/Next.js-16.2.1-black)
![MDX v6](https://img.shields.io/badge/MDX-v6.0.0-emerald)
![Tailwind v4](https://img.shields.io/badge/Tailwind-v4-38bdf8)
![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF)
![Vercel KV](https://img.shields.io/badge/Database-Vercel--KV-white)

---

## 🚀 Key Features

- **Agentic Ingestion API**: Secure endpoint for AI agents to submit posts using **HMAC SHA-256** signature verification.
- **Shadow Preview Architecture**: High-fidelity `iframe`-based preview for the Admin Editor, ensuring 1:1 rendering parity without RSC serialization bottlenecks.
- **Resilient Workout Rendering**: The `<WorkoutCard />` component utilize the "Pipe Format" (`exercises="Name | 5 | 3:00 | 7 | 60s"`) to bypass MDX v6 prop-stripping while maintaining elite technical layouts.
- **In-House GDPR Compliance**: Zero-dependency, privacy-first cookie management system with customizable consent tiers (Essential, Analytics, Marketing).
- **Athletic-Dark Experience**: A premium, high-contrast UI with oversized typography and evidence-based components like `<ScienceBadge />`.
- **Edge Performance**: Optimized for Next.js 16 (Turbopack) with server-side caching and hyper-fast Vercel KV state management.

## 🛠 Tech Stack

- **Framework**: Next.js 16.2.1 (App Router + Turbopack)
- **Styling**: Tailwind CSS v4 + PostCSS
- **Authentication**: Clerk (Metadata-driven RBAC for `/admin` and `/editor` clusters)
- **Database**: Vercel KV / Redis (Upstash)
- **Content**: `next-mdx-remote` v6.0.0 for secure, high-performance MDX rendering
- **State**: Custom `useConsent` hook for client-side GDPR persistence

---

## 🔒 Security & Workflow

1. **Ingest**: The AI Agent sends a POST request to `/api/agent/ingest`.
2. **Verify**: Middleware verifies the `x-hub-signature-256` header against the payload using HMAC.
3. **Queue**: Valid posts are stored in Vercel KV with `status: "pending_review"`.
4. **Editor UI**: Admin (verified via Clerk `sessionClaims.metadata.role === 'admin'`) edits and previews content at `/admin/edit/[slug]`.
5. **Publish**: Post is moved to `status: "published"`, Vercel Edge Cache (revalidateTag) is purged via the `'max'` profile, and content is live.

---

## 🏛 Privacy & Legal

- **Privacy Policy**: [fb-pt.it/privacy-policy](/privacy-policy) — GDPR (EU) 2016/679 compliant.
- **Cookie Policy**: [fb-pt.it/cookie-policy](/cookie-policy) — Directive 2009/136/EC compliant.
- **Contact**: Fabio Bauleo — fabio.bauleo.developer@gmail.com

---

## ⚕ Medical Disclaimer

The content provided by this platform is generated via AI agents for informational and educational purposes only. It is not intended as medical advice or as a substitute for the medical advice of a physician. Always consult your doctor before starting any new fitness regimen.

---

## 📄 License
© 2026 Fabio Bauleo. All Rights Reserved.
