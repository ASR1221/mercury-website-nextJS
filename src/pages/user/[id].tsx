import ProfileComp from "@/components/profile";

import { Post, ResObj, User } from "@/types/types";

type Params = {
   id: string
}

type PostRes = ResObj & {
   posts: Post[]
};

export async function getServerSideProps({ params }: { params: Params }) {

   const userRes = await fetch(`https://dummyjson.com/users/${params.id}?select=id,username,email`);
   if (!userRes.ok) throw new Error("Ops, something wrong happened. Please refresh the page.");

   const user: User = await userRes.json();

   const postRes = await fetch(`https://dummyjson.com/users/${params.id}/posts`);
   if (!postRes.ok) throw new Error("Ops, something wrong happened. Please refresh the page.");

   const postObj: PostRes = await postRes.json();
   
   return {
      props: {
         posts: postObj.posts,
         user,
      }
   }
}

export default function User({ posts, user }: { posts: Post[], user: User }) {

   return <div className="mt-12">
      <ProfileComp posts={posts} user={user} />
   </div>
}