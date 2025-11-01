# Semantic Search Demo

Explore how semantic search works — find results based on meaning, not just keywords, using vector embeddings and AI similarity search..

**Live** :

## Quick Start

### Prerequisites

- Node.js 18+
- Bun
- PostgreSQL
- ChatGPT Api Key
- Upstash Vector DB

### Setup

1. **Clone & Install**

   ```bash
   git clone <repo-url>
   cd semantic-search-demo
   bun install
   ```

2. **Configure Environment**

   ```bash
   cp .env.example .env
   # Fill in your credentials
   ```

3. **Setup Database**

   ```bash
   bun run db push
   bun run db:seed
   ```

4. **Run Dev Server**
   ```bash
   bun run dev
   ```

Visit `http://localhost:3000`
