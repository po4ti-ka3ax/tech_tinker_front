'use client'
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import Auth from "./auth/signin/page";
import { redirect } from "next/navigation";
import Content from "./content/page";

export default function Home() {
  const {data: session} = useSession();
  console.log(session)
  return (
    <>

    {
      redirect("content")
    }
      {/* {
          session?.user ? (
            <>
              <Content/>
            </>
          ) : (
            <>
              <Auth/>
            </>
          )
      } */}
    </>
  );
}
