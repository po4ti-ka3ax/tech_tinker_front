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
    const interval = setInterval(() => {
    const token = Cookies.get('access_token');

      if (!token) {
        router.push("/auth/signin");
        clearInterval(interval)
      }
    },1000)
    return () => clearInterval(interval)
  }, [router]);

  
    return (
        <>
          {children}
        </>
    );
  
}
