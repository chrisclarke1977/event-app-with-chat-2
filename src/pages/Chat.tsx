import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchWithAuth } from '../utils/api';
import { Send } from 'lucide-react';

export default function Chat() {
  const [message, setMessage] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const { data: events } = useQuery({
    queryKey: ['events'],
    queryFn: () => fetchWithAuth('/events')
  });

  const { data: messages } = useQuery({
    queryKey: ['chat', selectedEvent],
    queryFn: () => selectedEvent ? fetchWithAuth(`/chat/${selectedEvent}`) : null,
    enabled: !!selectedEvent
  });

  const sendMessage = useMutation({
    mutationFn: (messageData: any) => fetchWithAuth('/chat', {
      method: 'POST',
      body: JSON.stringify(messageData)
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat', selectedEvent] });
      setMessage('');
    }
  });

  const handleSend = () => {
    if (message.trim() && selectedEvent) {
      sendMessage.mutate({
        event_id: selectedEvent,
        message: message.trim()
      });
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-1 bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">Events</h2>
          <div className="space-y-2">
            {events?.map((event: any) => (
              <button
                key={event.id}
                onClick={() => setSelectedEvent(event.id)}
                className={`w-full text-left p-2 rounded ${
                  selectedEvent === event.id ? 'bg-blue-100' : 'hover:bg-gray-100'
                }`}
              >
                {event.title}
              </button>
            ))}
          </div>
        </div>

        <div className="col-span-3 bg-white rounded-lg shadow-md p-4">
          <div className="h-[600px] flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages?.map((msg: any) => (
                <div key={msg.id} className="flex flex-col">
                  <div className="flex items-baseline space-x-2">
                    <span className="font-semibold">{msg.sender_name}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(msg.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-1">{msg.message}</p>
                </div>
              ))}
            </div>

            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button
                onClick={handleSend}
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}