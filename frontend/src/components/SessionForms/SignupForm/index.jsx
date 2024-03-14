import "./SignupForm.css"
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useInput, useSubmit } from "../../../hooks";
import { FormErrors, Input } from "../../formElements";
import { signup } from "../../../store/session";
import { closeModal, openModal } from "../../../store/modal";

const SignupForm = () => {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const [email, onEmailChange] = useInput("");
  const [username, onUsernameChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [confirmPassword, onConfirmPasswordChange] = useInput("");

  const [errors, onSubmit] = useSubmit({ 
    action: signup({ email, username, password }),
    validate: () => {
      if (password !== confirmPassword) {
        return ['Confirm Password field must be the same as the Password field'];
      }
    },
    onSuccess: () => dispatch(closeModal())
  });

  if (sessionUser) return <Redirect to="/" />;

  return (
    <form onSubmit={onSubmit} className="signup-form">
      <h1>Signup</h1>
      <FormErrors errors={errors} />

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
      <span className="fake-link" onClick={() => dispatch(openModal("login"))}>Login instead</span>
    </form>
  );
}

export default SignupForm;