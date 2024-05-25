import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import Select from "react-select";
import styles from "./styles.module.scss";

export default function InputComboboxSelect({ children, options, error, ...rest }) {
  return (
    <>
      <Controller
        {...rest}
        render={({ field }) => (
          <Select
            {...field}
            className={styles.custom_select}
            classNamePrefix="react_select"
            options={options}
            isClearable
            placeholder="Escolhar um projeto"
            styles={{
              control: (provided) => ({
                ...provided,
                border: error
                  ? "none !important"
                  : "0.06rem solid var(--th-combobox-border)",
                outline: error
                  ? "0.06rem solid var(--th-combobox-error)"
                  : "none",
                placeContent: "center",
                height: rest.height || "3.5rem",
              }),
              option: (provided) => ({
                ...provided,
                backgroundColor: "transparent",
                color: "var(--th-input-color)",
                "&:hover": {
                  backgroundColor: "var(--th-combobox-hover)",
                },
              }),
            }}
          />
        )}
      />
      {children}
    </>
  );
}

InputComboboxSelect.propTypes = {
  children: PropTypes.node,
  error: PropTypes.any,
  options: PropTypes.any.isRequired,
};
