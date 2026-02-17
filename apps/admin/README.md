# Admin App

The admin dashboard for managing the Nexus platform. This is a separate Next.js application running on a different port.

## Running

```bash
pnpm dev
```

Runs on: http://localhost:3001

## Purpose

This app demonstrates how to run multiple Next.js applications in the same monorepo. In a real-world scenario, this could be:

- An internal admin panel
- A different frontend for a different user type
- A staging environment with different features

## Structure

```
app/
├── layout.tsx        # Root layout
└── page.tsx          # Admin dashboard page
```

## Potential Extensions

You could add:
- User management interface
- Analytics dashboard
- Configuration settings
- Direct database access using the `database` package

## Why a Separate App?

Having a separate admin app provides:
- **Isolation**: Different deployment pipeline
- **Security**: Can be hosted on internal network only
- **Performance**: Doesn't affect main app
- **Independence**: Different dependencies and configurations
