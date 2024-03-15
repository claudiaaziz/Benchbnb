import "./LoginForm.css";
import { useInput, useSubmit } from "../../../hooks";
import { FormErrors, Input } from "../../formElements";
import { login } from "../../../store/session";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../../../store/modal";

const LoginForm = () => {
  const dispatch = useDispatch()
  const [credential, onCredentialChange] = useInput("");
  const [password, onPasswordChange] = useInput("");

  const [errors, onSubmit] = useSubmit({
    action: login({ credential, password }),
    onSuccess: () => dispatch(closeModal())
  });

  return (
    <form onSubmit={onSubmit} className="login-form session-form"> 
      <h1>Log In</h1>
      <hr />
      <h2>Welcome to Airbnb</h2>

      <FormErrors errors={errors} />

      <Input
        placeholder="Username or Email"
        value={credential}
        onChange={onCredentialChange}
        required
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={onPasswordChange}
        required
      />

      <button type="submit">Log In</button>
      <span className="fake-link" onClick={() => dispatch(openModal("signup"))}>Sign up instead</span>
    </form>
  );
}

export default LoginForm;