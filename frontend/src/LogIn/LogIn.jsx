import styles from "./LogIn.module.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function LogIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmitChange = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/login/",
        formData
      );
      if (response.status === 200) {
        alert("Login successful");
        navigate("/menu");
        console.log("Login Successful:", response.data);
        setFormData({ email: "", password: "" });
      }
    } catch (error) {
      console.error(`There was a problem logging in ${error}`);
    }
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title_section}>
          <h1>Welcome to Crypto App</h1>
          <p>Enter your credentials to access the account</p>
        </div>
        <form onSubmit={handleSubmitChange}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@email.com"
          />
          <br />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="**********"
          />
          <br />
          <div className={styles.checkbox}>
            <div>
              <input type="checkbox" name="check" id="check" />
              <p>Remember me</p>
            </div>
            <a href="http://localhost:5173/menu">Forgot Password?</a>
          </div>
          <button type="submit">Log In</button>
          <button>Create Account</button>
        </form>
      </div>
    </>
  );
}

export default LogIn;
