import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import Select from "react-select";
import styles from "./styles.module.scss";

export default function InputComboboxMultiSelect({ children, options, error, ...rest }) {
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
            isMulti
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
              }),
              option: (provided) => ({
                ...provided,
                backgroundColor: "transparent",
                color: "var(--th-input-color)",
                "&:hover": {
                  backgroundColor: "var(--th-combobox-hover)",
                },
              }),
              multiValue: (provided) => ({
                ...provided,
                fontSize: "1.2rem",
                padding: "0.2rem",
                backgroundColor: "var(--th-combobox-hover)",
                borderRadius: ".4rem",
              }),
            }}
          />
        )}
      />
      {children}
    </>
  );
}

InputComboboxMultiSelect.propTypes = {
  children: PropTypes.node,
  error: PropTypes.any,
  options: PropTypes.any.isRequired,
};
