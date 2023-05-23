'use client';

import axios from 'axios';
import { FC, useState } from 'react';
import Cookies from 'js-cookie';

interface MessageFieldProps {
  roomId: string;
  userId: string;
}

const MessageField: FC<MessageFieldProps> = ({ roomId, userId }) => {
  const [text, setText] = useState('');

  const sendMessage = async (text: string) => {
    if (!text) return;
    await axios.post('/api/message', { text, roomId, ownerId: userId });
    setText('');
    window.scrollTo(0, document.body.scrollHeight);
  };

  return (
    <div className="flex gap-2">
      type a new message:
      <input
        onChange={({ target }) => setText(target.value)}
        value={text}
        className=""
        type="text"
      />
      <button onClick={() => sendMessage(text)}>send</button>
    </div>
  );
};

export default MessageField;
