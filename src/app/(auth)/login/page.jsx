"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { LoginPage } from "@/components/pages";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/my-account";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        username,
        password,
        callbackUrl,
      });

      if (res?.ok) {
        router.push(res.url || callbackUrl);
        return;
      }

      if (res?.error) {
        toast(res.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          type: "error",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <LoginPage
      username={username}
      password={password}
      isSubmitting={isSubmitting}
      onUsernameChange={(e) => setUsername(e.target.value)}
      onPasswordChange={(e) => setPassword(e.target.value)}
      onSubmit={handleLogin}
    />
  );
}
