# Hobbly

> A cozy place for everything you love.

Hobbly is a fullstack hobby tracking and journaling app. Log entries for your hobbies, visualize your activity over time with a GitHub-style calendar, and optionally share your profile publicly. It also has a social layer — follow other users, explore their entries, and like what resonates with you.

**Live:** [hobbly.dev](https://hobbly.dev)

![TypeScript](https://img.shields.io/badge/TypeScript-88%25-3178C6?style=flat-square&logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)

---

## What You Can Do

### Pick your hobbies, build your dashboard
When you sign up, you choose from many hobby categories — Anime, Gaming, Art, Cooking, Running, Journal, and more. Each hobby you pick becomes a widget on your personal dashboard. Your dashboard is yours: it shows only the hobbies you care about, in the order you want them.

### See your activity over time
Your profile features a **GitHub-style activity heatmap** — a full year of your logging history shown as a color-coded calendar. The more you log, the richer it looks. It's a quiet, satisfying way to see your own consistency.

### Set a current mood
Beyond per-entry moods, you can set a **current mood** that shows on your profile — a snapshot of how you're feeling right now, visible to anyone who visits your page.

### Public profiles and share links
Your profile lives at `hobbly.dev/@yourusername`. You can set it to **public** (anyone can find and view it) or **private** (hidden by default). Either way, you can generate a **share link** — a unique URL that lets anyone see your profile regardless of visibility settings, like a portfolio link you hand out intentionally.

### Explore and connect
The **Explore page** surfaces entries from across the community. Browse by hobby, discover what others are watching or making, and follow users whose taste you like. Entries can be liked, and you can follow and unfollow freely. The social layer is lightweight — it's about inspiration, not performance.

---

## Features

- **28 hobby categories** across Tracked, Creative, Journal, and General types
- **Activity calendar** — GitHub-style heatmap of your logging history
- **Mood tracking** — attach how you felt to every entry
- **Flexible metadata** — anime entries track episode and status, gaming tracks hours, art tracks medium — all via a flexible JSON field
- **Social layer** — follow users, like entries, explore the community feed
- **Public profiles** — share your profile via a unique link, or keep it private
- **Dark mode** — full light/dark theme support
- **JWT auth** — HTTP-only cookie-based auth with access + refresh token rotation
- **Email flows** — verification and password reset via Handlebars email templates

---

## Tech Stack

| Layer | Tech |
|---|---|
| Monorepo | Turborepo + npm workspaces |
| Frontend | React 18, TypeScript, Vite, Tailwind CSS v4 |
| Backend | NestJS, Prisma 7, PostgreSQL (Neon) |
| Shared types | `packages/types` |
| Auth | HTTP-only JWT cookies (access 15min + refresh 7d) |
| External APIs | Jikan (MyAnimeList) |
| Deployment | Render |

---

## License

MIT
