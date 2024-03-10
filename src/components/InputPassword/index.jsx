import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import { useState } from "react";
import { IconChoice } from "../../utils/IconChoice";

export default function InputPassword({ label, register, ...props }) {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className={styles.input__password} tabIndex="{0}">
      <input
        {...register(label)}
        {...props}
        type={passwordVisible ? "password" : "text"}
      />
      <button type="button" onClick={handlePasswordVisibility}>
        <IconChoice
          tabIndex="{0}"
          icon={passwordVisible ? "eyeOff" : "eyeOn"}
          color="var(--th-icon-eye)"
        />
      </button>
    </div>
  );
}
InputPassword.propTypes = {
  label: PropTypes.node.isRequired,
  register: PropTypes.func.isRequired,
};