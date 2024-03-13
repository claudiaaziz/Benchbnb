import "./LoginForm.css";
import { useInput, useSubmit } from "../../hooks";
import { FormErrors, Input } from "../formElements";
import { login } from "../../store/session";

const LoginForm = ({ setShowModal }) => {
  const [credential, onCredentialChange] = useInput("");
  const [password, onPasswordChange] = useInput("");

  const [errors, onSubmit] = useSubmit({
    action: login({ credential, password }),
    onSuccess: () => setShowModal(false)
  });

  return (
    <form onSubmit={onSubmit} className="login-form"> 
      <FormErrors errors={errors} />

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