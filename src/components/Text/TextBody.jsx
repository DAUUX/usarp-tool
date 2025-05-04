import PropTypes from "prop-types";
import style from "./styles.module.scss";

export function TextBody({ text, children,...rest }) {
  return (
    <span className={style.text__body} {...rest}>
      {children || text}
    </span>
  );
}

TextBody.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node,
};
