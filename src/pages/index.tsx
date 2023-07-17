import { Fragment, useRef } from "react";

import { ResObj } from "@/types/types";
import Link from "next/link";

type User = {
  username: string,
  id: number,
}

type UserRes = ResObj & {
  users: User[],
}

export async function getServerSideProps() {

  const res = await fetch("https://dummyjson.com/users?select=username,id");
  if (!res.ok) throw new Error("Ops, something wrong happened. Please refresh the page.")
  
  const resObj: UserRes = await res.json();
  const users: User[] = resObj.users;

  return {
    props: { users },
  }

}

export default function Home({ users }: { users: User[] }) {

  const idRef = useRef<HTMLSelectElement | null>(null);

  return <div className="ml-8">
    <h1 className="mt-32 mb-10 w-fit text-5xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">Mercury</h1>
    <h3 className="mb-7 text-xl max-w-md">A social media website created using dummyJSON REST API</h3>
    <p className="max-w-xs">Since it is a dummy website you will have to use one of the following users</p>
    <select
      name="name"
      className=" bg-gray-700 px-4 py-1 m-3 text-xl rounded-lg border-[1px] border-gray-500 outline-none"
      ref={idRef}
    >
      {
        users?.map((user, i) => <Fragment key={user.id}>
          <option
            value={user.username}
            selected={i === 0 ? true : false}
          >{user.username}</option> 
        </Fragment>)
      }
    </select>
    <Link href={`/home?id=${idRef.current?.value}`} className="ml-3 px-3 py-1 bg-gray-700 border-gray-500 border-[1px] text-slate-50 rounded-lg text-lg hover:text-slate-50 hover:no-underline">Choose</Link>
    <footer className="absolute bottom-7">
      <h3 className="pb-5 text-xl">Created by <span>Abdullah Salah</span></h3>
      <div>
        <p>Email: <a href="mailto:asr12211@outlook.com">asr12211@outlook.com</a></p>
        <p>Phone number: +964 771 382 1672</p>
        <p>Linked in: <a href="https://www.linkedin.com/in/abdullah-salah-29209b235">Abdullah Salah</a></p>
        <p>Github: <a href="https://github.com/ASR1221?tab=repositories">ASR1221</a></p>
      </div>
    </footer>
  </div>
}