import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";
import { useInput } from "../../hooks";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [credential, onCredentialChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="login-form"> 
      <ul className="errors">
        {errors.map(error => <li key={error}>{error}</li>)}
      </ul>
      <label>
        Username or Email
        <input
          type="text"
          placeholder="Username or Email"
          value={credential}
          onChange={onCredentialChange}
          required
          autoFocus
        />
      </label>
      <label>
        Password
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={onPasswordChange}
          required
        />
      </label>
      <button type="submit">Log In</button>
    </form>
  );
}

export default LoginForm;