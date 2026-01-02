'use client';

import { useState, useCallback } from 'react';
import { RealtimeAgent, RealtimeSession } from '@openai/agents/realtime';

export default function VoiceAgent() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<RealtimeSession | null>(null);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    setError(null);

    try {
      // Fetch ephemeral token from our API route
      const tokenResponse = await fetch('/api/token', {
        method: 'POST',
      });

      if (!tokenResponse.ok) {
        throw new Error('Failed to get ephemeral token');
      }

      const { token } = await tokenResponse.json();

      // Create the agent
      const agent = new RealtimeAgent({
        name: 'Assistant',
        instructions: 'You are a helpful assistant.',
      });

      // Initialize session
      const newSession = new RealtimeSession(agent, {
        model: 'gpt-realtime',
      });

      // Connect to OpenAI's realtime API
      await newSession.connect({
        apiKey: token,
      });

      setSession(newSession);
      setIsConnected(true);
      console.log('Successfully connected to voice agent!');
    } catch (err) {
      console.error('Connection error:', err);
      setError(err instanceof Error ? err.message : 'Failed to connect');
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(async () => {
    if (session) {
      try {
        await session.close();
        setSession(null);
        setIsConnected(false);
        console.log('Disconnected from voice agent');
      } catch (err) {
        console.error('Disconnect error:', err);
        setError(err instanceof Error ? err.message : 'Failed to disconnect');
      }
    }
  }, [session]);

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-black dark:text-white">
          Voice Agent
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {isConnected
            ? 'Connected - start speaking!'
            : 'Click connect to start talking to the AI assistant'}
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      <button
        onClick={isConnected ? disconnect : connect}
        disabled={isConnecting}
        className={`px-6 py-3 rounded-full font-medium transition-colors ${
          isConnected
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        } ${isConnecting ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isConnecting
          ? 'Connecting...'
          : isConnected
          ? 'Disconnect'
          : 'Connect to Voice Agent'}
      </button>

      {isConnected && (
        <div className="flex items-center gap-2 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
          <p className="text-sm text-green-700 dark:text-green-300">
            Microphone active - speak to begin conversation
          </p>
        </div>
      )}

      <div className="text-xs text-zinc-500 dark:text-zinc-500 mt-2">
        <p>
          Note: You&apos;ll need to set your OPENAI_API_KEY environment variable
          to use this feature. The browser will request microphone permissions
          when you connect.
        </p>
      </div>
    </div>
  );
}
