import { getPost } from '@/lib/api';

type Props = {
  params: {
    id: string;
  };
};

async function getData(id: string) {
  const posts = await getPost(id);
  return posts;
}

export async function generateMetadata({ params }: Props) {
  const post = await getData(params.id);

  return {
    title: post.title,
    description: post.body,
  };
}

const Post = async ({ params: { id } }: Props) => {
  const post = await getData(id);

  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </>
  );
};

export default Post;
