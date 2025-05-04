import PropTypes from "prop-types";
import style from "./styles.module.scss";

export function TextRoot({ children, ...rest }) {
  return (
    <div className={style.text__container} {...rest}>
      {children}
    </div>
  );
}

TextRoot.propTypes = {
  children: PropTypes.node.isRequired,
};
