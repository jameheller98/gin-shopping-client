import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useSetRecoilState } from 'recoil';
import * as yup from 'yup';
import CommonButton from '../components/buttons/commonButton/CommonButton';
import Spinner from '../components/common/spinner/Spinner';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import Tooltip from '../components/utilities/tooltip/Tooltip';
import { mockTooltipProps } from '../components/utilities/tooltip/Tooltip.mocks';
import ApiUser from '../libs/api/ApiUser';
import { LoginRequest } from '../libs/user/interfaces';
import { tokenState, userState } from '../state/user/UserAtoms';
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
  const setUser = useSetRecoilState(userState);

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
        token: 'Bearer ' + response.token.token,
        tokenRefresh: response.token.refreshToken,
      });

      setUser(response.user);
    } catch (err) {
      if (err instanceof AxiosError) setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col sm:mx-[120px] md:mx-[200px] lg:[400px]">
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
          Submit {loading && <Spinner />}
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
