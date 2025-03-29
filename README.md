This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

Here's a step-by-step guide to set up a new Prisma database, connect it to a Next.js app, and execute the schema:

1. Set Up Prisma
   npm install prisma --save-dev
   npx prisma init
   This creates a directory with a file and a file for environment variables.
   Define your database connection in the file:
   DATABASE_URL="your_database_connection_string"

2. Define Your Schema
   Open and define your models. For example:
   generator client {
   provider = "prisma-client-js"
   }

datasource db {
provider = "postgresql"
url = env("DATABASE_URL")
}

model User {
id Int @id @default(autoincrement())
name String
email String @unique
}

3. Run Migrations
   To apply the schema to your database, run:
   npx prisma migrate dev --name init

4. Connect Prisma to Next.js
   Install Prisma Client:
   npm install @prisma/client
   Create a Prisma Client instance in your Next.js app:
   import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
const users = await prisma.user.findMany();
res.json(users);
}

5. Execute Queries
   Use Prisma Client to interact with your database. For example:
   const newUser = await prisma.user.create({
   data: {
   name: "John Doe",
   email: "john.doe@example.com",
   },
   });

This should get your Prisma database up and running with Next.js. Let me know if you need help troubleshooting or expanding on this!
