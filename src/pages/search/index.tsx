import PostComp from "@/components/post";
import { User, Post, ResObj } from "@/types/types";
import Link from "next/link";
import { useEffect, useRef, useState } from "react"

type UserRes = ResObj & {
   users: User[]
}

type PostRes = ResObj & {
   posts: Post[]
}

type Results = [
   PostRes,
   UserRes,
] 

export default function Search() {

   const searchTermRef = useRef<HTMLInputElement>(null);
   const [showState, setShowState] = useState(true);
   const [error, setError] = useState<Error | null>(null);
   const [isLoading1, setIsLoading1] = useState(false);
   const [isLoading2, setIsLoading2] = useState(false);
   const [posts, setPosts] = useState<Post[]>();
   const [postUsers, setPostUsers] = useState<User[]>();
   const [users, setUsers] = useState<User[]>();

   function handleSearch() {
      setIsLoading1(true);
      setIsLoading2(true);
      fetch(`https://dummyjson.com/posts/search?q=${searchTermRef.current?.value}`)
         .then(res => res.json())
         .then(data => {
            setPosts(data.posts);
            const promises = data.posts?.map((post: Post) => fetch(`https://dummyjson.com/users/${post.userId}?select=username,id,email`));

            if (promises)
               Promise.all(promises)
                  .then(res => Promise.all(res.map(r => r.json())))
                  .then(data => {
                     setPostUsers(data);
                     setIsLoading1(false);
                  }).catch(e => {
                     setError(e);
                     setIsLoading1(false);
                  });
         })
         .catch(e => {
            setError(e);
            setIsLoading1(false);
         });
      
      fetch(`https://dummyjson.com/users/search?q=${searchTermRef.current?.value}&select=id,username,email`)
         .then(res => res.json())
         .then(data => {
            setUsers(data.users);
            setIsLoading2(false);
         })
         .catch(e => {
            setError(e);
            setIsLoading2(false);
         });


   }

   return <div className="mt-12">
      <input
         type="search"
         name="search"
         ref={searchTermRef}
         onKeyDown={(e) => { if(e.key === "Enter") handleSearch()}}
         className="px-2 py-1 bg-gray-700 border-2 border-gray-500 outline-none rounded-md w-[100%]"
      />

      <div>
         {
            isLoading1 || isLoading2 ? <p>Loading...</p>
            : error ? <p>{ error.message }</p>
            : posts && users && <>
               <div className="mt-8 my-5">
                  <button
                     onClick={() => setShowState(true)}
                     className={`px-2 py-1 cursor-pointer border-slate-50 ${showState && "border-b-2"}`}
                  >Posts</button>
                  <button
                     onClick={() => setShowState(false)}
                     className={`px-2 py-1 cursor-pointer border-slate-50 ${!showState && "border-b-2"}`}
                  >Users</button>
               </div>
               <div>
                  {
                     showState ?  (posts?.length ? <PostComp users={postUsers ? postUsers : []} posts={posts ? posts : []} /> : <p>No Posts</p>)
                     : (users?.length ? users?.map((user, i) => <Link
                        href={`user/${user.id}`}
                        key={user.id}
                        className={`p-2 block cursor-pointer text-slate-50 hover:text-slate-50 hover:no-underline hover:bg-gray-500 border-gray-500 ${i !== users.length - 1 && "border-b-2"}`}
                     >{user.username}</Link>)
                     : <p>No Users</p>)
                  }      
               </div>
            </>
         }
      </div>
   </div>
}