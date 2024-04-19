import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import { useState } from "react";
import { IconChoice } from "../../utils/IconChoice";

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
      <button type="button" onClick={handlePasswordVisibility}>
        <IconChoice
          tabIndex="{0}"
          icon={passwordVisible ? "eyeOff" : "eyeOn"}
          color={outline}
        />
      </button>
    </fieldset>
  );
}
InputPassword.propTypes = {
  label: PropTypes.node.isRequired,
  outline: PropTypes.string,
  register: PropTypes.func.isRequired,
};
