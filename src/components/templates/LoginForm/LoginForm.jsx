"use client";

import Link from "next/link";
import { cn } from "@/utils/cn";
import styles from "./LoginForm.module.scss";
import { Input } from "@/components/ui/Form";

export default function LoginForm({ 
  username,
  password,
  isSubmitting,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
}) {
  return (
    <div className={cn(styles.customer_login, "customer_login")}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div className={cn(styles.account_form, "account_form")}>
              <h3>login</h3>
              <form action="#" method="POST" onSubmit={onSubmit}>
                <Input
                  className="mb-20"
                  name="username"
                  label="Username"
                  required
                  value={username}
                  onChange={onUsernameChange}
                  autoComplete="username"
                />
                <Input
                  className="mb-20"
                  name="password"
                  label="Password"
                  type="password"
                  required
                  value={password}
                  onChange={onPasswordChange}
                  autoComplete="current-password"
                />
                <div className={cn(styles.login_submit, "login_submit")}>
                  <button className="mb-20" type="submit" disabled={isSubmitting}>
                    login
                  </button>
                  <p className="mb-0">
                    Don&apos;t have an account?{" "}
                    <Link className="text-danger" href="/register">
                      Register
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
