import PropTypes from "prop-types";
import style from "./styles.module.scss";

export function TextHeadline({ text, as: Tag = "h1", children, ...rest }) {
  return (
    <Tag className={style.headline} {...rest}>
      {children || text}
    </Tag>
  );
}

TextHeadline.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node,
  as: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6"]),
};