'use client';

import { pusherClient } from '@/lib/pusher';
import Cookies from 'js-cookie';
import { FC, useEffect, useState } from 'react';

interface MessagesProps {
  initialMessages: {
    text: string;
    id: string;
    ownerId: string;
  }[];
  roomId: string;
  userId: string;
}

const Messages: FC<MessagesProps> = ({ initialMessages, roomId, userId }) => {
  const [incomingMessages, setIncomingMessages] = useState<any[]>([]);

  useEffect(() => {
    pusherClient.subscribe(roomId);

    pusherClient.bind('incoming-message', (data: any) => {
      setIncomingMessages((prev) => [...prev, data]);
    });
    // pusherClient.bind();

    return () => {
      pusherClient.unsubscribe(roomId);
    };
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#e3bf907d',
      }}
    >
      {initialMessages.map((message) => (
        <p
          style={{
            marginLeft: userId === message.ownerId ? 'auto' : 0,
            borderBottom: '1px dashed',
            padding: '10px',
          }}
          key={message.id}
        >
          {message.text} --- {message.ownerId}
        </p>
      ))}
      {incomingMessages.map((data, i) => (
        <p
          style={{
            marginLeft: userId === data.ownerId ? 'auto' : 0,
            borderBottom: '1px dashed',
            padding: '10px',
          }}
          key={i + data.text}
        >
          {data?.text} --- {data.ownerId}
        </p>
      ))}
    </div>
  );
};

export default Messages;
