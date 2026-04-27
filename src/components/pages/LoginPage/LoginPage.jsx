"use client";

import { Breadcrumb } from "@/components/ui";
import styles from "./LoginPage.module.scss";
import { cn } from "@/utils/cn";

export default function LoginPage() {
  return (
    <div>
      <Breadcrumb
        title="Login"
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop/grid/sidebar-left" },
          { label: "Login" },
        ]}
      />

      <div className="customer_login">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className={cn(styles.account_form, "account_form")}>
                <h3>login</h3>
                <form action="#" method="POST">
                  <div className="default-form-box mb-20">
                    <label>
                      Username or email <span>*</span>
                    </label>
                    <input type="text" />
                  </div>
                  <div className="default-form-box mb-20">
                    <label>
                      Passwords <span>*</span>
                    </label>
                    <input type="password" />
                  </div>
                  <div className={cn(styles.login_submit, "login_submit")}>
                    <button className="mb-20" type="submit">
                      login
                    </button>
                    <label className="checkbox-default mb-20" htmlFor="offer">
                      <input type="checkbox" id="offer" />
                      <span>Remember me</span>
                    </label>
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      Lost your password?
                    </a>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-lg-6 col-md-6">
              <div className={cn(styles.account_form, "account_form", styles.register, "register")}>
                <h3>Register</h3>
                <form action="#">
                  <div className="default-form-box mb-20">
                    <label>
                      Email address <span>*</span>
                    </label>
                    <input type="text" />
                  </div>
                  <div className="default-form-box mb-20">
                    <label>
                      Passwords <span>*</span>
                    </label>
                    <input type="password" />
                  </div>
                  <div className="login_submit">
                    <button type="submit">Register</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
