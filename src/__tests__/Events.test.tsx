import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Events from '../pages/Events';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

vi.mock('../utils/api', () => ({
  fetchWithAuth: vi.fn(() =>
    Promise.resolve([
      {
        id: 1,
        title: 'Test Event',
        description: 'Test Description',
        location: 'Test Location',
        event_time: '2024-03-20T10:00:00Z',
      },
    ])
  ),
}));

describe('Events Component', () => {
  it('renders events list', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Events />
      </QueryClientProvider>
    );

    expect(await screen.findByText('Test Event')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Test Location')).toBeInTheDocument();
  });

  it('displays create event button', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Events />
      </QueryClientProvider>
    );

    expect(screen.getByText('Create Event')).toBeInTheDocument();
  });
});