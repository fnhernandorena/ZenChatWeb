import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    console.log('Form submitted:', data);
  };

  return (
    <div className="flex justify-center items-center mt-24 bg-[#242424]">
      <div className="bg-[#2d2d2d] p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center text-white">
          Sign In
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-white">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              {...register('username')}
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm bg-[#3b3b3b] text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 ${
                errors.username ? 'border-red-500' : 'border-transparent'
              }`}
            />
            {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register('password')}
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm bg-[#3b3b3b] text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 ${
                errors.password ? 'border-red-500' : 'border-transparent'
              }`}
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-violet-600 text-white py-2 px-4 rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
