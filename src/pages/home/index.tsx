import type { Post } from "@/types/types";
import Link from "next/link";

export async function getServerSideProps() {
   try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!res.ok) {
         return {
            props: { ok: false, posts: [] }
         }
      }

      const posts: Post[] = await res.json();
      return {
         props: { ok: true, posts }
      }
   } catch (e) {
      return {
         props: { ok: false, posts: [] }
      }
   }
}

export default function Posts({ ok, posts }: { ok: boolean, posts: Post[] }) {
   
   if (!ok) {
      return <>
         <h2>Error</h2>
         <p>Sorry, something went wrong. Go back to <Link href="/">home page</Link></p>
      </>
   }

   return <>
      
   </>
}