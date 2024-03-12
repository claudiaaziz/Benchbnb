import { useState } from "react";
import { useDispatch } from "react-redux";

export const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => setValue(e.target.value);

  return [value, handleChange];
};

export const useSubmit = ({ action }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(action).catch(async (res) => {
      let data;
      try {
        data = await res.clone().json(); // .clone() essentially allows you to read the response body twice
      } catch {
        data = await res.text(); // will hit this case if, e.g., server is down
      }
      if (data?.errors) setErrors(data.errors);
      else if (data) setErrors([data]);
      else setErrors([res.statusText]);
    });
  };

  return [errors, onSubmit];
};
