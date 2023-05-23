'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import Cookies from 'js-cookie';

import axios from 'axios';

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (body) => {
    try {
      const { data } = await axios.post(
        'http://localhost:3000/api/signin',
        body
      );

      Cookies.set('userId', data?.id);
      Cookies.set('access_token', data?.access_token);
      router.push(redirectUrl || '/');
    } catch (error: any) {
      console.log(error.response);
    }
  };

  return (
    <div
      style={{
        width: '100vw',
        minHeight: '100vh',
        backgroundColor: '#fcdf96',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Email" {...register('email', { required: true })} />
        <input
          placeholder="Password"
          {...register('password', { required: true })}
        />
        {(errors.email || errors.password) && <p>All fields are required</p>}
        <input type="submit" />
      </form>
    </div>
  );
};

export default Login;
