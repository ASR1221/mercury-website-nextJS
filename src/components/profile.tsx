import Image from "next/image";
import PostComp from "./post";

import { Post, User } from "@/types/types";

import { useRouter } from "next/router";

export default function ProfileComp({ posts, user }: { posts: Post[], user: User }) {

   const { push } = useRouter();

   function handleSignout() {
      const cookies = document.cookie.split(";");

      cookies.forEach((cookie) => {
         const cookieName = cookie.split("=")[0].trim();
         document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      });

      push("/");
   }
   
   return <>
      <div className="mb-7 p-3 flex bg-gray-700 border-2 border-gray-500 rounded-xl">
         <div className="w-[75%]">
            <h2 className="text-2xl">{ user.username }</h2>
            <p>{ user.email }</p>
         </div>
         <button
            className="cursor-pointer w-14 ml-auto hover:-mt-1 hover:mb-1 transition-all duration-300 rounded-full border-white border-2 bg-stone-900 p-1"
            onClick={handleSignout}
         >
            <Image src="/signOut-icon.png" alt="sign out icon" width={30} height={30} className="mx-auto"/>
         </button>
      </div>

      <h3 className="text-3xl ml-3">Posts</h3>
      <PostComp posts={posts} users={[user]} />
   </>
}