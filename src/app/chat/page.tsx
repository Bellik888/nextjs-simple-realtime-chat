'use client';

import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

const Page: FC = () => {
  let roomIdInput = '';
  const router = useRouter();

  const userId = Cookies.get('userId');

  const createRoom = async () => {
    const res = await axios.post('/api/rooms/create', {});

    const roomId: string = await res.data;
    router.push(`/room/${roomId}/${userId}`);
  };

  const joinRoom = async (roomId: string) => {
    router.push(`/room/${roomId}/${userId}`);
  };

  return (
    <div>
      <button onClick={createRoom}>Create room</button>
      <div className="flex gap-2">
        <input
          type="text"
          onChange={({ target }) => (roomIdInput = target.value)}
          className="border border-zinc-300"
        />

        <button onClick={() => joinRoom(roomIdInput)}>Join room</button>
      </div>
    </div>
  );
};

export default Page;
