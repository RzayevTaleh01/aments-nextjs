"use client";

import { cn } from "@/utils/cn";
import styles from "./RegisterTemplate.module.scss";

export default function RegisterTemplate() {
  return (
    <div className="customer_login">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div className={cn(styles.account_form, "account_form", styles.register, "register")}>
              <h3>Register</h3>
              <form action="#" method="POST">
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
                <div className={cn(styles.login_submit, "login_submit")}>
                  <button type="submit">Register</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

