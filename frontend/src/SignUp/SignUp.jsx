import styles from "./SignUp.module.scss";
function SignUp() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title_section}>
          <h1>Welcome to Crypto App</h1>
          <p>Create a free account by filling data below</p>
        </div>
        <form action="">
          <div className={styles.name_section}>
            <div>
              {" "}
              <label htmlFor="">Name</label>
              <input type="text" placeholder="James" />
            </div>
            <div>
              <label htmlFor="">Surname</label>
              <input type="text" placeholder="Arthur" />
            </div>
          </div>
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
          <label htmlFor="">Repeat Password</label>
          <input
            type="password"
            name="password"
            id=""
            placeholder="**********"
          />
          <div className={styles.checkbox}>
            <input type="checkbox" name="check" id="" />
            <p>
              I agree with <span>Terms & Conditions</span>
            </p>
          </div>

          <button>Create Account</button>
          <p className={styles.last_section}>
            Already have an account? <a href="">Log In</a>
          </p>
        </form>
      </div>
    </>
  );
}

export default SignUp;
