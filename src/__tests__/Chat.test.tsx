import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Chat from '../pages/Chat';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

vi.mock('../utils/api', () => ({
  fetchWithAuth: vi.fn((endpoint) => {
    if (endpoint === '/events') {
      return Promise.resolve([
        { id: 1, title: 'Test Event' },
      ]);
    }
    if (endpoint === '/chat/1') {
      return Promise.resolve([
        {
          id: 1,
          sender_name: 'Test User',
          message: 'Test Message',
          timestamp: '2024-03-20T10:00:00Z',
        },
      ]);
    }
    return Promise.resolve([]);
  }),
}));

describe('Chat Component', () => {
  it('renders event list and chat interface', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Chat />
      </QueryClientProvider>
    );

    expect(await screen.findByText('Test Event')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/type your message/i)).toBeInTheDocument();
  });

  it('allows selecting an event', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Chat />
      </QueryClientProvider>
    );

    const eventButton = await screen.findByText('Test Event');
    fireEvent.click(eventButton);

    expect(await screen.findByText('Test Message')).toBeInTheDocument();
  });
});