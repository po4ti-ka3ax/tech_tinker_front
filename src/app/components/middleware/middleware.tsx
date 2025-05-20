"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedMiddleware({ children }: ProtectedRouteProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const Cookies = require('js-cookie')

  useEffect(() => {
    if (status === "unauthenticated" && !Cookies.get('access_token')) {
      router.push("/auth/signin");
    }
  }, [status, router]);

  
    return (
        <>
          {children}
        </>
    );
  
}
