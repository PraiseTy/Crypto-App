import styles from "./LogIn.module.scss";
function LogIn() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title_section}>
          <h1>Welcome to Crypto App</h1>
          <p>Enter your credentials to access the account</p>
        </div>
        <form action="">
          <label htmlFor="">Email</label>
          <input type="email" name="email" id="" placeholder="name@email.com" />
          <br />
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            id=""
            placeholder="**********"
          />
          <br />
          <div className={styles.checkbox}>
            <div>
              <input type="checkbox" name="check" id="" />
              <p>Remember me</p>
            </div>
            <a href="">Forgot Password?</a>
          </div>
          <button>Log In</button>
          <button>Create Account</button>
        </form>
      </div>
    </>
  );
}

export default LogIn;
