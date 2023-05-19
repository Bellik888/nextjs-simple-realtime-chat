import axios from 'axios';

export const getPosts = async () => {
  try {
    const { data } = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    );
    return data;
  } catch (error: any) {
    console.log(error.response);
  }
};

export const getPost = async (id: string) => {
  try {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    return data;
  } catch (error: any) {
    console.log(error.response);
  }
};
