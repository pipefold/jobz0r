This is a [Next.js](https://nextjs.org) project implementing the [OpenAI Agents JS Voice Quickstart](https://openai.github.io/openai-agents-js/guides/voice-agents/quickstart/).

## Voice Agent Features

This project includes a real-time voice agent that allows you to have spoken conversations with an AI assistant powered by OpenAI's Realtime API.

### Prerequisites

- Node.js and pnpm installed
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Setup

1. Copy the example environment file and add your OpenAI API key:

```bash
cp .env.example .env.local
```

2. Edit `.env.local` and replace `sk-your-api-key-here` with your actual OpenAI API key:

```
OPENAI_API_KEY=sk-your-actual-key-here
```

### Getting Started

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the voice agent interface.

### How to Use

1. Click "Connect to Voice Agent" button
2. Grant microphone permissions when prompted
3. Start speaking to the AI assistant
4. The assistant will respond with voice in real-time

### Project Structure

- `app/page.tsx` - Main page with voice agent interface
- `app/components/VoiceAgent.tsx` - Client-side voice agent component
- `app/api/token/route.ts` - API route for generating ephemeral OpenAI tokens

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
