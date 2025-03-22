# Scriptify Mortgage

A modern web application for mortgage content creation and social media management.

## Project Overview

Scriptify Mortgage is a comprehensive platform that helps mortgage professionals create engaging content for social media, manage their online presence, and grow their business through effective digital marketing.

## Technologies Used

This project is built with:

- **Frontend**: React, TypeScript, Vite
- **UI Components**: shadcn/ui (based on Radix UI)
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Authentication, Database, Edge Functions)
- **Payment Processing**: Stripe
- **AI Integration**: OpenAI and Anthropic APIs for content generation

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm or bun

### Installation

1. Clone the repository:
```sh
git clone <YOUR_GIT_URL>
cd scriptify-mortgage
```

2. Install dependencies:
```sh
npm install
# or
bun install
```

3. Create a `.env` file based on the `.env.example` template:
```sh
cp .env.example .env
# Edit .env with your actual values
```

4. Start the development server:
```sh
npm run dev
# or
bun run dev
```

## Features

- **Content Creation**: AI-powered tools to generate mortgage-related content
- **Social Media Management**: Schedule and manage posts across platforms
- **Analytics**: Track performance of your content
- **Learning Center**: Resources for mortgage professionals
- **Subscription Plans**: Pro and Enterprise tiers with different features

## Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

### Quick Deployment

#### Deploy to Netlify

```sh
# Install Netlify CLI if not already installed
npm install -g netlify-cli

# Build the project
npm run build

# Deploy to Netlify
npm run deploy:netlify
```

#### Deploy Supabase Functions

```sh
# Install Supabase CLI if not already installed
npm install -g supabase

# Deploy functions and set environment variables
npm run deploy:supabase
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software. All rights reserved.
