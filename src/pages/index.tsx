import { BaseSyntheticEvent, Fragment, useRef } from "react";
import { useRouter } from "next/router";

import { ResObj, User } from "@/types/types";

import Link from "next/link";

type UserRes = ResObj & {
  users: User[],
}

export async function getServerSideProps() {

  const res = await fetch("https://dummyjson.com/users?select=username,id,email");
  if (!res.ok) throw new Error("Ops, something wrong happened. Please refresh the page.")
  
  const resObj: UserRes = await res.json();

  return {
    props: { users: resObj.users },
  }

}

export default function Home({ users }: { users: User[] }) {

  const idRef = useRef<User | undefined>(users[0]);

  function handleSelect(e: BaseSyntheticEvent) {
    idRef.current = users.find(user => user.username === e.target.value);
  }

  function handleLinkclick(e: BaseSyntheticEvent) {
    document.cookie = `username=${idRef.current?.username};`;
    document.cookie = `id=${idRef.current?.id};`;
    document.cookie = `email=${idRef.current?.email};`;
    e.target.innerText = "Loading...";
  }

  return <div className="ml-8">
    <h1 className="mt-32 mb-10 w-fit text-5xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">Mercury</h1>
    <h3 className="mb-7 text-xl max-w-md">A social media website created using dummyJSON REST API</h3>
    <p className="max-w-xs">Since it is a dummy website you will have to use one of the following users</p>
    <select
      name="name"
      className=" bg-gray-700 px-4 py-1 m-3 text-xl rounded-lg border-[1px] border-gray-500 outline-none hover:bg-gray-500 transition-all duration-300"
      onChange={handleSelect}
    >
      {
        users?.map(user => <Fragment key={user.id}>
          <option
            value={user.username}
          >{user.username}</option> 
        </Fragment>)
      }
    </select>
    <Link
      href="/home"
      className="ml-3 px-3 py-1 bg-gray-700 border-gray-500 border-[1px] text-slate-50 rounded-lg text-lg hover:text-slate-50 hover:no-underline hover:bg-gray-500 transition-all duration-300"
      onClick={handleLinkclick}
    >Choose</Link>
    <footer className="mt-12">
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