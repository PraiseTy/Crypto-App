import { useState } from "react";
import styles from "./SignUp.module.scss";
import axios from "axios";
function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    repeatPassword: "",
    check: false,
  });
  const [error, setError] = useState({});

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.surname) newErrors.surname = "Surname is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.repeatPassword)
      newErrors.repeatPassword = "Passwords do not match";
    if (!formData.check)
      newErrors.checkbox = "You must agree to the Terms & Conditions.";

    return newErrors;
  };

  const handleSubmitChange = async (event) => {
    event.preventDefault();

    const newErrors = validateForm();
    setError(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      if (formData.password !== formData.repeatPassword) {
        alert("Passwords do not match");
        return;
      }
      const response = await axios.post(
        "http://localhost:8000/api/v1/signup/",
        formData
      );
      if (response.status === 201 || response.status === 200) {
        console.log("User Registrated successfully:", response.data);
        alert("Registration successful");
        setFormData({
          name: "",
          surname: "",
          email: "",
          password: "",
          repeatPassword: "",
        });
      }
    } catch (error) {
      console.error(`There was a problem with your registration: ${error}`);
      alert("SignUp failed");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title_section}>
          <h1>Welcome to Crypto App</h1>
          <p>Create a free account by filling data below</p>
        </div>
        <form onSubmit={handleSubmitChange}>
          <div className={styles.name_section}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="James"
              />
              {error.name && (
                <p className={styles.error_message}>{error.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="surname">Surname</label>
              <input
                type="text"
                id="surname"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                placeholder="Arthur"
              />
              {error.surname && (
                <p className={styles.error_message}>{error.surname}</p>
              )}
            </div>
          </div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@email.com"
          />
          {error.email && <p className={styles.error_message}>{error.email}</p>}
          <br />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="**********"
          />
          {error.password && (
            <p className={styles.error_message}>{error.password}</p>
          )}

          <br />
          <label htmlFor="repeatPassword">Repeat Password</label>
          <input
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={handleChange}
            placeholder="**********"
          />
          {error.password && (
            <p className={styles.error_message}>{error.password}</p>
          )}

          <div className={styles.checkbox}>
            <input
              type="checkbox"
              name="check"
              checked={formData.check}
              onChange={handleChange}
            />
            <p>
              I agree with <span>Terms & Conditions</span>
            </p>
          </div>
          {error.checkbox && (
            <p className={styles.error_message}>{error.checkbox}</p>
          )}

          <button type="submit">Create Account</button>
          <p className={styles.last_section}>
            Already have an account?{" "}
            <a href="http://localhost:5173/login/">Log In</a>
          </p>
        </form>
      </div>
    </>
  );
}

export default SignUp;
