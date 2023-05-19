'use client';

import Link from 'next/link';
import React, { FC, useMemo, useState } from 'react';

interface PostsListProps {
  posts: any[];
}

const PostsList: FC<PostsListProps> = ({ posts }) => {
  const [filter, setFilter] = useState('');

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => post.title.includes(filter));
  }, [posts, filter]);

  return (
    <div>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {filteredPosts.map((el: any) => (
          <li key={el.id}>
            <Link href={`/blog/${el.id}`}>{el.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsList;
