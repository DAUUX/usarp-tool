import styles from "./styles.module.scss";
import PropTypes from "prop-types";
export default function InputDropdown({
  label,
  registerName,
  register,
  data,
  children,
  ...props
}) {
  return (
    <div  className={styles.InputDropdown}>
      <label htmlFor="">{label}</label>
      <select {...props} {...register(registerName)}>
        <option value="" disabled hidden>Escolhar...</option>
        {data.map((item) => {
          return (
              <option key={item.label} aria-label={item.label} value={item.value}>
                {item.label}
              </option>
          );
        })}
      </select>
      {children}
    </div>
  );
}

InputDropdown.propTypes = {
  label: PropTypes.node.isRequired,
  registerName: PropTypes.node.isRequired,
  register: PropTypes.func.isRequired,
  children: PropTypes.node,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
