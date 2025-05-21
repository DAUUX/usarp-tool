import PropTypes from "prop-types";
import style from "./styles.module.scss";

export function TextCaption({ text, children, ...rest }) {
  return (
    <span className={style.text__caption} {...rest}>
      {children || text}
    </span>
  );
}

TextCaption.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node,
};
