import { Transition } from '@headlessui/react';
import {
  EyeIcon,
  EyeSlashIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import * as yup from 'yup';
import CommonButton from '../components/buttons/commonButton/CommonButton';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import Tooltip from '../components/utilities/tooltip/Tooltip';
import { mockTooltipProps } from '../components/utilities/tooltip/Tooltip.mocks';
import ApiUser from '../libs/api/ApiUser';
import { tokenState } from '../state/user/UserAtoms';
import { NextPageWithLayout } from './page';

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
};

const emailRegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PassOneLowercaseRegExp = /[a-z]+/;
const PassOneUppercaseRegExp = /[A-Z]+/;
const PassOneDigitRegExp = /[0-9]+/;
const PassOneSpecialCharRegExp = /[!@#$&*]+/;

const schemaRegister = yup
  .object({
    email: yup
      .string()
      .required('Email is required')
      .matches(emailRegExp, 'Email invalid'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password least 8 characters')
      .matches(PassOneLowercaseRegExp, 'Password least 1 lowercase letter')
      .matches(PassOneUppercaseRegExp, 'Password least 1 uppercase letter')
      .matches(PassOneDigitRegExp, 'Password least 1 digit')
      .matches(PassOneSpecialCharRegExp, 'Password least 1 special letter'),
    confirmPassword: yup
      .string()
      .required('Confirm password is required')
      .oneOf(
        [yup.ref('password'), null],
        'Confirm password is must match password'
      ),
    firstName: yup
      .string()
      .required('First name is required')
      .min(4, 'First name least 4 characters')
      .max(20, 'First name max 20 characters'),
    lastName: yup
      .string()
      .required('Last name is required')
      .min(4, 'Last name max 20 characters')
      .max(20, 'Last name max 20 characters'),
  })
  .required();

const Register: NextPageWithLayout = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const [visibleInfoPass, setVisibleInfoPass] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schemaRegister),
  });
  const token = useRecoilValue(tokenState);

  useEffect(() => {
    if (token) router.push('/');
  }, [token, router]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ApiUser.registerUser(data);

      console.log(response.msg);

      router.push('/login');
    } catch (err) {
      if (err instanceof AxiosError) setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col">
      <h1 className="text-3xl font-medium tracking-wider mt-16 text-slate-900 ml-14">
        Register
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
          <Transition
            show={visibleInfoPass}
            enter="transition-[transform] duration-[300ms]"
            enterFrom="translate-x-1/2 -translate-y-full scale-0"
            enterTo="translate-x-0 translate-y-0 scale-100"
            leave="transition-[transform] duration-[300ms]"
            leaveFrom="translate-x-0 translate-y-0 scale-100"
            leaveTo="translate-x-1/2 -translate-y-full scale-0"
          >
            <p className="flex gap-2 mx-2 px-4 py-3 mt-5 bg-slate-400 text-slate-50 rounded-md font-medium">
              <span>*</span>
              <span className="text-sm">
                Password is must least 1 lowercase, 1 uppercase, 1 digit, 1
                special letter and 8 characters.
              </span>
            </p>
          </Transition>
          <InformationCircleIcon
            className="absolute h-6 top-2 -right-8"
            onClick={() => setVisibleInfoPass((visible) => !visible)}
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
        <label className="col-span-2 relative" aria-label="Confirm password">
          <input
            className={`w-full shadow-[0_0_0_1px_inset] shadow-slate-400 py-2 rounded-md pl-10 ${
              !errors.confirmPassword ? 'pr-3' : 'pr-10'
            }`}
            type={showConfirmPass ? 'text' : 'password'}
            {...register('confirmPassword')}
            placeholder="ConfirmPassword"
            disabled={loading}
          />
          {showConfirmPass ? (
            <EyeIcon
              className="absolute h-6 top-2 left-2"
              onClick={() => setShowConfirmPass(false)}
            />
          ) : (
            <EyeSlashIcon
              className="absolute h-6 top-2 left-2"
              onClick={() => setShowConfirmPass(true)}
            />
          )}
          {errors.confirmPassword && (
            <Tooltip
              className="top-2 right-2"
              content={
                errors.confirmPassword.message || mockTooltipProps.base.content
              }
            />
          )}
        </label>
        <label className="relative" aria-label="First name">
          <input
            className={`w-full shadow-[0_0_0_1px_inset] shadow-slate-400 py-2 rounded-md ${
              !errors.firstName ? 'px-3' : 'pl-2 pr-10'
            }`}
            type="text"
            {...register('firstName')}
            placeholder="First Name"
            disabled={loading}
          />
          {errors.firstName && (
            <Tooltip
              className="top-2 right-2"
              content={
                errors.firstName.message || mockTooltipProps.base.content
              }
            />
          )}
        </label>
        <label className="relative" aria-label="Last name">
          <input
            className={`w-full shadow-[0_0_0_1px_inset] shadow-slate-400 py-2 rounded-md ${
              !errors.lastName ? 'px-3' : 'pl-2 pr-10'
            }`}
            type="text"
            {...register('lastName')}
            placeholder="Last Name"
            disabled={loading}
          />
          {errors.lastName && (
            <Tooltip
              className="top-2 right-2"
              content={errors.lastName.message || mockTooltipProps.base.content}
            />
          )}
        </label>
        {error && (
          <div className="col-span-2 text-red-500">
            * Email is already taken
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
      <div className="text-center mt-10">
        Already account?{' '}
        <Link href="/login">
          <a className="text-blue-500">Come with us</a>
        </Link>
      </div>
    </section>
  );
};

export default Register;

Register.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
