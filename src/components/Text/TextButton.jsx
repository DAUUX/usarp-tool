import PropTypes from "prop-types";
import style from "./styles.module.scss";

export function TextButton({ text, children,...rest }) {
  return (
    <span className={style.text__button} {...rest}>
      {children || text}
    </span>
  );
}

TextButton.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node,
};
