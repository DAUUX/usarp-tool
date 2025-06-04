import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import { useState } from "react";
import { Button } from "../Button";

export default function InputPassword({
  label,
  outline = "var(--th-icon-eye)",
  register,
  ...rest
}) {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <fieldset className={styles.input__password} tabIndex="{0}"
    >
      <input
      {...rest}
        {...register(label)}
        type={passwordVisible ? "password" : "text"}
      />
      <Button.Root type="button" onClick={handlePasswordVisibility}>
        <Button.Icon
          icon={passwordVisible ? "eyeOff" : "eyeOn"}
          color={outline}
          tabIndex="{0}"
        />
      </Button.Root>
    </fieldset>
  );
}
InputPassword.propTypes = {
  label: PropTypes.node.isRequired,
  outline: PropTypes.string,
  register: PropTypes.func.isRequired,
};
