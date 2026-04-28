"use client";

import { cn } from "@/utils/cn";
import styles from "./LoginTemplate.module.scss";

export default function LoginTemplate() {
  return (
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
        </div>
      </div>
    </div>
  );
}

