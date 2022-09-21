import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import * as yup from 'yup';
import CommonButton from '../components/buttons/commonButton/CommonButton';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import Tooltip from '../components/utilities/tooltip/Tooltip';
import { mockTooltipProps } from '../components/utilities/tooltip/Tooltip.mocks';
import ApiUser from '../libs/api/ApiUser';
import { LoginRequest } from '../libs/user/interfaces';
import { tokenState } from '../state/user/UserAtoms';
import { NextPageWithLayout } from './page';

type FormData = {
  email: string;
  password: string;
};

const schemaRegister = yup
  .object({
    email: yup.string().required('Email is required'),
    password: yup.string().required('Password is required'),
  })
  .required();

const Login: NextPageWithLayout = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const [showPass, setShowPass] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schemaRegister),
  });
  const [token, setToken] = useRecoilState(tokenState);

  useEffect(() => {
    if (token.token) router.push('/');
  }, [token.token, router]);

  const onSubmit = async (data: LoginRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ApiUser.loginUser(data);

      router.push('/');

      setToken({
        token: 'Bearer ' + response.jwt,
        tokenRefresh: response.refreshToken,
      });
    } catch (err) {
      if (err instanceof AxiosError) setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col w-screen">
      <h1 className="text-3xl font-medium tracking-wider mt-16 text-slate-900 ml-14">
        Login
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-5 px-14 mt-10"
      >
        <label className="col-span-2 relative" aria-label="Email">
          <input
            className={`w-full shadow-[0_0_0_1px_inset] shadow-slate-400 py-2 rounded-md ${
              !errors.email ? 'px-3' : 'pl-2 pr-10'
            }`}
            type="text"
            {...register('email')}
            placeholder="Email"
            disabled={loading}
          />
          {errors.email && (
            <Tooltip
              className="top-2 right-2"
              content={errors.email.message || mockTooltipProps.base.content}
            />
          )}
        </label>
        <label className="col-span-2 relative" aria-label="Password">
          <input
            className={`w-full shadow-[0_0_0_1px_inset] shadow-slate-400 py-2 rounded-md pl-10 ${
              !errors.password ? 'pr-3' : 'pr-10'
            }`}
            type={showPass ? 'text' : 'password'}
            {...register('password')}
            placeholder="Password"
            disabled={loading}
          />
          {showPass ? (
            <EyeIcon
              className="absolute h-6 top-2 left-2"
              onClick={() => setShowPass(false)}
            />
          ) : (
            <EyeSlashIcon
              className="absolute h-6 top-2 left-2"
              onClick={() => setShowPass(true)}
            />
          )}
          {errors.password && (
            <Tooltip
              className="top-2 right-2"
              content={errors.password.message || mockTooltipProps.base.content}
            />
          )}
        </label>
        {error && (
          <div className="col-span-2 text-red-500">
            * Email or password incorrect, please check again!
          </div>
        )}
        <CommonButton
          className="col-span-1 py-3 mt-4 col-start-2"
          type="submit"
          disabled={loading}
        >
          Submit{' '}
          {loading && (
            <svg
              className="inline w-5 h-5 text-gray-200 animate-spin dark:text-slate-600 fill-slate-50"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          )}
        </CommonButton>
      </form>
      {/* Login with google, facebook*/}
      {/* <div className="relative mt-10 text-slate-700">
        <hr className="border-t-2 border-slate-600 w-[250px] absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" />
        <span className="absolute bg-slate-50 px-3 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-sm">
          Or continue with
        </span>
      </div> */}
      <div className="text-center mt-10">
        Not a member?{' '}
        <Link href="/register">
          <a className="text-blue-500">Register now</a>
        </Link>
      </div>
    </section>
  );
};

export default Login;

Login.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
