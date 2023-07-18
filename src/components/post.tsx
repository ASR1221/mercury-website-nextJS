import { Post, User, Comment, ResObj } from "@/types/types";
import { useRef, useState } from "react";

type CommentObj = ResObj & {
   comments: Comment[],
}

export default function PostComp({ posts, users }: { posts: Post[], users: User[] }) {

   const [comments, setComments] = useState<Comment[]>([]);
   const [error, setError] = useState<Error | null>(null);

   const dialogRef = useRef<HTMLDialogElement | null>(null);

   async function handleCommentClick(postId: number) {
      try {
         setError(null);

         const res = await fetch(`https://dummyjson.com/comments/post/${postId}`);
         if (!res.ok) throw new Error("Ops, something wrong happend. Please try again.");

         const resObj: CommentObj = await res.json();
         setComments(resObj.comments);

         dialogRef.current?.showModal();
      } catch (e: Error | any) {
         setError(e);
      }
   }

   return <>
      {
         posts.map((post, i) => <div key={i} className="px-3 pt-2 my-4 rounded-xl bg-gray-700 border-[1px] border-gray-500">
            <h3 className="text-2xl">{ post.title }</h3>
            <p className="text-sm">{users.length === 1 ? users[0].username : users[i].username}</p>
            <p className="my-3">{post.reactions} Reaction{ post.reactions > 1 && "s"}</p>
            <p>{post.body}</p>
            <p
               className="mt-4 py-3 rounded-es-lg rounded-ee-lg text-center border-t-2 border-gray-500 hover:bg-gray-500 hover:-mx-3 transition-all cursor-pointer duration-300"
               onClick={() => handleCommentClick(post.id)}
            >Comments</p>
         </div>)
      }

      <dialog ref={dialogRef} className="w-[80%] sm:max-w-lg h-[75%] mx-auto p-3 pb-40 text-slate-50 bg-gray-700 border-2 border-gray-400 rounded-xl backdrop:bg-black backdrop:bg-opacity-75">
         <h3 className="text-2xl mb-4">Comments</h3>
         {error ? <p>{error?.message}</p>
            : !comments.length ? <p>No comments on this post</p>
               : comments.map((comment, i) => <div key={comment.id} className={`${i !== comments.length - 1 && "border-b-2"} p-3 border-gray-500`}>
               <p><strong>{comment.user.username}</strong></p>
               <p>{comment.body}</p>
            </div>)
         }

         <div className="fixed bottom-[13%] w-[79%] max-w-lg -ml-3 overflow-hidden">
            <p className="text-red-600 w-[100%] sm:w-[99%] bg-gray-700 border-b-2 border-t-2 max-w-lg px-2 border-gray-500">Adding a comment will not add it to the database because of using dummyJSON REST API</p>
            <input
               type="text"
               name="comment"
               placeholder="Write a comment"
               className="w-[100%] sm:w-[99%] max-w-lg p-2 bg-gray-700 text-slate-50 outline-none rounded-ee-lg rounded-es-lg"
               onKeyDown={(e) => { if(e.key === "Enter") e.target.value = ""}}
            />
         </div>

         <button
            onClick={() => dialogRef.current?.close()}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 text-lg rounded-md bg-red-700 border-2 border-red-600 outline-none hover:bg-red-800 transition-all duration-200"
         >close</button>
      </dialog>
      
   </>
}