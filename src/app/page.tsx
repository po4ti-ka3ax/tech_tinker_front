'use client'
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import Auth from "./auth/page";

export default function Home() {
  const session = useSession();
  console.log(session)
  return (
    <>
      {
          session.data ? (
            <>
              {/* <button onClick={() => signOut()}>sign out</button> */}
            </>
          ) : (
            <>
              <Auth/>
            </>
          )
      }
    </>
  );
}
