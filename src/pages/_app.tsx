import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { Amita, Aref_Ruqaa, Arimo } from "@next/font/google";

import Image from 'next/image';
import Link from 'next/link';

import blueStar from "/public/blue-star.svg";
import whiteStar from "/public/white-star.svg";
import circle from "/public/circle.svg";
import rectangle from "/public/rectangle.svg";

// Fonts
const amita = Amita({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-amita"
});

const ruqaa = Aref_Ruqaa({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-ruqaa"
});

const arimo = Arimo({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-arimo"
});

export default function App({ Component, pageProps }: AppProps) {

  const { pathname, push } = useRouter();
  
  useEffect(() => {
    if (pathname !== "/") {
      if (!(document?.cookie.includes("username")
        && document?.cookie.includes("id")
        && document?.cookie.includes("email"))) push("/");
    }
  }, [pathname]);
  
  // To display header the right way in the layout 
  const pageName = useMemo(() => {
    return pathname === "/home" ? "Home"
      : pathname === "/search" ? "Search"
      : pathname.includes("/user") ? "User"
      : pathname === "/profile" ? "Profile" : "";
  }, [pathname]);

  return <div className={`${arimo.variable} ${amita.variable} ${ruqaa.variable} isolate sm:max-w-xl max-w-[90%] mx-auto py-3 h-[100vh]`}>
    {
      pageName && <h1 className="text-4xl pt-4 w-fit mx-auto">{ pageName }</h1>
    }  
      <Component {...pageProps} />
    {
      pageName && <div className='fixed bottom-2 right-2 flex flex-col gap-2'>
        {pageName !== "Home" && <Link
          href="/home"
          className='hover:-ml-3 hover:mr-3 transition-all duration-300 rounded-full border-white border-2 bg-stone-900 p-1'
        >
          <Image src="/home-icon.png" alt="home icon" width={30} height={30}/>
        </Link>}
        {pageName !== "Search" && <Link
          href="/search"
          className='hover:-ml-3 hover:mr-3 transition-all duration-300 rounded-full border-white border-2 bg-stone-900 p-1'
        >
          <Image src="/search-icon.svg" alt="search icon" width={30} height={30}/>
        </Link>}
        {pageName !== "Profile" && <Link
          href="/profile"
          className='hover:-ml-3 hover:mr-3 transition-all duration-300 rounded-full border-white border-2 bg-stone-900 p-1'
        >
          <Image src="/profile-icon.png" alt="profile icon" width={30} height={30}/>
        </Link>}
      </div>
    }
      <Image src={circle} alt='background image' className='fixed bottom-[200px] -right-20 -z-10' />
      <Image src={circle} alt='background image' className='fixed -bottom-16 -left-20 -z-10' />
      <Image src={rectangle} alt='background image' className='fixed top-0 -left-5 -z-10' />
      <Image src={whiteStar} alt='background image' className='fixed bottom-[250px] -left-3 rotate-[25deg] -z-10' width={40} height={42}/>
      <Image src={whiteStar} alt='background image' className='fixed bottom-[400px] right-5 -z-10' />
      <Image src={blueStar} alt='background image' className='fixed bottom-6 right-20 -z-10' />
      <Image src={blueStar} alt='background image' className='fixed top-0 right-6 -z-10' />
      <Image src={blueStar} alt='background image' className='fixed top-5 -z-10' />
    </div>
}
