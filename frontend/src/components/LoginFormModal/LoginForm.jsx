import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";
import { useInput } from "../../hooks";
import { FormErrors, Input } from "../Forms";

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
      {errors.length > 0 && <FormErrors errors={errors}/>}

      <Input
        label="Username or Email:"
        placeholder="Username or Email"
        value={credential}
        onChange={onCredentialChange}
        required
        autoFocus
      />
      <Input
        label="Password:"
        placeholder="Password"
        type="password"
        value={password}
        onChange={onPasswordChange}
        required
      />
      <button type="submit">Log In</button>
    </form>
  );
}

export default LoginForm;