import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css"
import { useInput } from "../../hooks";
import { FormErrors, Input } from "../Forms";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, onEmailChange] = useInput("");
  const [username, onUsernameChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [confirmPassword, onConfirmPasswordChange] = useInput("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
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
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors.length > 0 && <FormErrors errors={errors}/>}

      <Input
        label="Email:"
        placeholder="Email"
        value={email}
        onChange={onEmailChange}
        required
        autoFocus
      />
      <Input
        label="Username:"
        placeholder="Username"
        value={username}
        onChange={onUsernameChange}
        required
      />
      <Input
        label="Password:"
        placeholder="Password"
        type="password"
        value={password}
        onChange={onPasswordChange}
        required
      />
      <Input
        label="Confirm Password:"
        placeholder="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={onConfirmPasswordChange}
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupFormPage;