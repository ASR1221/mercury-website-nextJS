import type { Post, ResObj, User } from "@/types/types";

import PostComp from "@/components/post";

type PostRes = ResObj & {
   posts: Post[]
};

export async function getServerSideProps() {

   const postRes = await fetch("https://dummyjson.com/posts");
   if (!postRes.ok) throw new Error("Ops, something wrong happened. Please refresh the page.");


   const postObj: PostRes = await postRes.json();

   const promises = postObj.posts.map(post => fetch(`https://dummyjson.com/users/${post.userId}?select=username,id,email`));

   const results = await Promise.all(promises);

   const promises2 = results.map(result => {
      if (!result.ok) throw new Error("Ops, something wrong happened. Please refresh the page.");;
      return result.json();
   });

   const users: User[] = await Promise.all(promises2);
   
   return {
      props: {
         posts: postObj.posts,
         users,
      }
   }
}

export default function Posts({ posts, users }: { posts: Post[], users: User[] }) {

   return <div className="mt-12">
      <PostComp posts={posts} users={users}/>
   </div>
   
}