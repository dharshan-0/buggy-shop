This is a simple e-commerce website build with [Next.js 15](https://nextjs.org), Tailwindcss, zod and Auth.js V5 for authentication

## Installation

### Postgres setup:

Create a table to store user info:
```sql
create table my_user (username varchar(20) PRIMARY KEY, password varchar(20) NOT NULL);
```

Create a table to store orders info:
```sql
create table my_order (id SERIAL PRIMARY KEY, product varchar NOT NULL, cost integer NOT NULL, username varchar(20) NOT NULL);
```

### Running dev server

First, install dependencies:

```bash
pnpm i 
```

Second, run development server:

```bash
pnpm dev 
```

make sure to update `.env.local` file.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Why I done this?

I placed a bug in this project on purpose, because I created this to conduct competition for my college juniors.