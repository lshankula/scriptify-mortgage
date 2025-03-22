# Deployment Guide for Scriptify Mortgage

This guide provides instructions for deploying the Scriptify Mortgage application to production.

## Prerequisites

- Node.js (v18 or later recommended)
- npm or bun
- Supabase account
- Stripe account (for payment processing)
- OpenAI API key
- Anthropic API key (optional, used as fallback)

## Environment Variables

The application uses environment variables for configuration. Before deployment, you need to set up the following environment variables:

### Frontend Environment Variables

These variables are used by the Vite application during build:

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `VITE_STRIPE_PRICE_ID_PRO`: Stripe price ID for the Pro tier
- `VITE_STRIPE_PRICE_ID_ENTERPRISE`: Stripe price ID for the Enterprise tier

### Supabase Edge Functions Environment Variables

These variables are used by the Supabase Edge Functions:

- `OPENAI_API_KEY`: Your OpenAI API key
- `ANTHROPIC_API_KEY`: Your Anthropic API key
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `STRIPE_PRICE_ID_PRO`: Stripe price ID for the Pro tier
- `STRIPE_PRICE_ID_ENTERPRISE`: Stripe price ID for the Enterprise tier

## Deployment Steps

### 1. Set up Environment Variables

Create a `.env` file based on the `.env.example` template and fill in your actual values:

```bash
cp .env.example .env
# Edit .env with your actual values
```

### 2. Test and Build the Application

Before deploying, you can test the build process locally:

```bash
npm run test-build
# or
bun run test-build
```

This will:
1. Check if all required environment variables are set
2. Build the application for production
3. Start a local server to test the built application

Once you're satisfied with the test build, you can build the application for production:

```bash
npm run build
# or
bun run build
```

This will create a `dist` directory with the built application.

### 3. Deploy the Frontend

#### Option 1: Deploy via Lovable

The easiest way to deploy is through Lovable:

1. Open [Lovable](https://lovable.dev/projects/08b50c92-b910-40d8-8526-77eae24bb4d1)
2. Click on Share -> Publish

#### Option 2: Deploy to Netlify

For custom domain support, you can deploy to Netlify:

1. Create a `netlify.toml` file in the root of your project:

```toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

2. Push your code to a Git repository
3. Connect your repository to Netlify
4. Configure the environment variables in Netlify's dashboard

### 4. Deploy Supabase Edge Functions

Deploy the Supabase Edge Functions to your Supabase project:

1. Install the Supabase CLI if you haven't already:

```bash
npm install -g supabase
```

2. Login to Supabase:

```bash
supabase login
```

3. Link your project:

```bash
supabase link --project-ref cffngmvbjojshjenwcds
```

4. Deploy the functions:

```bash
supabase functions deploy generate-post
supabase functions deploy create-checkout-session
```

5. Set the environment variables for the functions:

You can use the provided helper script to set the environment variables from your `.env` file:

```bash
npm run deploy:supabase
```

Or set them manually:

```bash
supabase secrets set OPENAI_API_KEY=your-openai-api-key
supabase secrets set ANTHROPIC_API_KEY=your-anthropic-api-key
supabase secrets set STRIPE_SECRET_KEY=your-stripe-secret-key
supabase secrets set STRIPE_PRICE_ID_PRO=your-stripe-price-id-pro
supabase secrets set STRIPE_PRICE_ID_ENTERPRISE=your-stripe-price-id-enterprise
```

## Helper Scripts

This project includes several helper scripts to make deployment easier:

- `npm run test-build`: Tests the build process locally
- `npm run deploy:supabase`: Deploys Supabase Edge Functions and sets environment variables
- `npm run deploy:netlify`: Builds the application and deploys it to Netlify
- `node check-env.js`: Checks if all required environment variables are set
- `node setup-supabase-env.js`: Sets up environment variables for Supabase Edge Functions

## Verifying Deployment

After deployment, verify that:

1. The frontend application loads correctly
2. Authentication with Supabase works
3. The Supabase Edge Functions are accessible
4. Stripe payment processing works correctly

## Troubleshooting

### Common Issues

- **CORS Errors**: Ensure that your Supabase project has the correct CORS configuration. You can set this in the Supabase dashboard under Settings > API > CORS.
- **Authentication Issues**: Verify that your Supabase URL and anonymous key are correct.
- **Edge Function Errors**: Check the Supabase Edge Function logs in the Supabase dashboard.
- **Stripe Integration Issues**: Verify that your Stripe keys and price IDs are correct.

### Getting Help

If you encounter issues not covered in this guide, refer to:

- [Vite Documentation](https://vitejs.dev/guide/)
- [Supabase Documentation](https://supabase.io/docs)
- [Stripe Documentation](https://stripe.com/docs)
