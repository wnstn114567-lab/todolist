# Deployment

## Local Verification

Run the main checks before shipping:

```bash
npm run lint
npm run build
npm run dev
```

The current project shell does not require any environment variables.

## Deploying To Vercel

1. Push the repository to your Git provider.
2. Import the project into Vercel.
3. Keep the detected Next.js defaults.
4. Deploy.

Vercel will install dependencies and run the production build automatically.

## Deploying To A Node Server

1. Install dependencies with `npm install`.
2. Build the app with `npm run build`.
3. Start the server with `npm run start`.
4. Reverse proxy traffic to the Next.js server if needed.

## Pre-Deploy Checklist

- Confirm `npm run build` passes.
- Confirm the homepage renders locally.
- Add environment variables only when a real backend or auth flow is introduced.
