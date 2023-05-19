import { getPosts } from '@/lib/api';
import Link from 'next/link';
import PostsList from './PostsList';

async function getAllPosts() {
  const posts = await getPosts();
  return posts;
}

export const revalidate = 20;

const Blog = async () => {
  const posts = await getAllPosts();

  return (
    <>
      <h1>Blog Page </h1>
      <PostsList posts={posts} />
    </>
  );
};

export default Blog;
