import Image from "next/image";
import styles from "./SignUp.module.css";

export default function SignUpProfessional() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.logoContainer}>
        <Image src="/aws-logo.png" alt="AWS Logo" width={90} height={90} />
        <span>PICT</span>
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.header}>
          <h1 className={styles.headerText}>Sign Up</h1>
          <p className={styles.subtitle}>
            Join a community of cloud enthusiasts
          </p>
        </div>
        <form action="#" method="post">
          <div className={styles.formGroup}>
            <label htmlFor="fullname">Full Name</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Enter Your Full Name Here"
              className={styles.darkInput}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email Address Here"
              className={styles.darkInput}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Your Password Here"
              className={styles.darkInput}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confirm_password">Confirm Password</label>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              placeholder="Confirm Password Here"
              className={styles.darkInput}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="mobile_number">Mobile Number</label>
            <input
              type="tel"
              id="mobile_number"
              name="mobile_number"
              placeholder="Enter Your Mobile Number Here"
              className={styles.darkInput}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="company_name">Company Name</label>
            <input
              type="text"
              id="company_name"
              name="company_name"
              placeholder="Enter Your Company Name Here"
              className={styles.darkInput}
            />
          </div>
          <button type="submit" className={styles.signUpButton}>
            Sign Up
          </button>
        </form>
        <div className={styles.loginLink}>
          <p>
            Already have an account? <a href="#">Log In</a>
          </p>
        </div>
      </div>
      <div className={styles.illustrationContainer}>
        <Image
          src="/porgi_illustration.png"
          alt="Cloud illustration"
          width={300}
          height={200}
        />
      </div>
    </div>
  );
}
