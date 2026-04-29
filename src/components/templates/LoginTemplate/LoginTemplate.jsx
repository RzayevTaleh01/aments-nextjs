"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { cn } from "@/utils/cn";
import styles from "./LoginTemplate.module.scss";

export default function LoginTemplate() {
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
    <div className="customer_login">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div className={cn(styles.account_form, "account_form")}>
              <h3>login</h3>
              <form action="#" method="POST" onSubmit={handleLogin}>
                <div className="default-form-box mb-20">
                  <label>
                    Username or email <span>*</span>
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    required
                  />
                </div>
                <div className="default-form-box mb-20">
                  <label>
                    Passwords <span>*</span>
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />
                </div>
                <div className={cn(styles.login_submit, "login_submit")}>
                  <button className="mb-20" type="submit" disabled={isSubmitting}>
                    login
                  </button>
                 
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
