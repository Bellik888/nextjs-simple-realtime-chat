import MessageField from '@/components/MessageField';
import Messages from '@/components/Messages';
import db from '@/server/lib/db';

import Message from '@/server/models/message.model';
import Room from '@/server/models/room.model';

interface PageProps {
  params: {
    slug: string[];
  };
}

export async function generateStaticParams() {
  await db();
  const data = await Room.find({});

  return data.map((room: any) => {
    return {
      params: {
        slug: `${room._id}`,
      },
    };
  });
}

const page = async ({ params }: PageProps) => {
  const { slug } = params;
  const roomId = slug[0];
  const userId = slug[1];

  const existingMessages = await Message.find({ chatRoomId: roomId });

  const serializedMessages = existingMessages.map((message) => ({
    text: message.text,
    id: message.id,
    ownerId: message.ownerId,
  }));

  return (
    <div>
      <p>messages:</p>
      <Messages
        roomId={roomId}
        userId={userId}
        initialMessages={serializedMessages}
      />
      <MessageField roomId={roomId} userId={userId} />
    </div>
  );
};

export default page;
