import { NextRequest } from "next/server";
import { Post, ResObj, User } from "@/types/types";

import ProfileComp from "@/components/profile";

type PostRes = ResObj & {
   posts: Post[]
};

export async function getServerSideProps({ req }: { req: NextRequest }) {
   const id = req.cookies?.id;
   const username = req.cookies?.username;
   const email = req.cookies?.email;

   if (!(id && username && email)) return {
      redirect: {
         destination: "/",
         permanent: false,
      }
   }

   const postRes = await fetch(`https://dummyjson.com/users/${id}/posts`);
   if (!postRes.ok) throw new Error("Ops, something wrong happened. Please refresh the page.");


   const postObj: PostRes = await postRes.json();
   
   return {
      props: {
         posts: postObj.posts,
         user: { 
            id,
            username,
            email,
         }
      }
   }
}

export default function Profile({ posts, user }: { posts: Post[], user: User }) {

   return <div className="mt-12">
      <ProfileComp posts={posts} user={user} />
   </div>
}