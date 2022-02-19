import Link from "next/link";
import { useState } from "react";
import nookies from 'nookies'

export async function getServerSideProps(ctx) {
   const cookies = nookies.get(ctx);

   if (cookies.token) {
      return {
         redirect: {
            destination: '/dashboard'
         }
      }
   }

   return {
      props: {},
   }
}

export default function Register() {
   const [fields, setFields] = useState({});
   const [progress, setProgress] = useState(false);
   const [success, setSuccess] = useState(false);

   function setValue(e) {
      e.preventDefault();

      const name = e.target.getAttribute('name');
      setFields({
         ...fields,
         [name]: e.target.value
      });
   }

   async function doRegister(e) {
      e.preventDefault();

      setProgress(true);
      const req = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/local/register`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(fields)
      });

      const res = await req.json();

      if (res.jwt) {
         setFields({});
         setSuccess(true);
         e.target.reset();
      }

      setProgress(false);

      console.log(res);
   }

   return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
         <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
            <h1 className="text-blue-500 font-bold text-center text-2xl mb-5 capitalize">Register your account</h1>
            {success && (
               <div className="text-center capitalize text-white bg-green-500 rounded mb-4 p-2">
                  Congratulations! Your account has been registered.
               </div>
            )}
            <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
               <form onSubmit={doRegister} className="px-5 py-7 relative">
                  {progress && (
                     <div className="absolute inset-0 z-10 bg-white/50"></div>
                  )}
                  <label className="font-semibold text-sm text-gray-600 pb-1 block">Username</label>
                  <input type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" name="username" onChange={setValue} />
                  <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                  <input type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" name="email" onChange={setValue} />
                  <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
                  <input type="password" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" name="password" onChange={setValue} />
                  <button type="submit" disabled={progress} className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                     <span className="inline-block mr-2">Register</span>
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                     </svg>
                  </button>
               </form>
            </div>
            <div className="py-5">
               <div className="grid grid-cols-2 gap-1">
                  <div className="text-center sm:text-left whitespace-nowrap">
                     <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-top">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <Link href="/login"><a className="inline-block ml-1">Login Account</a></Link>
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}