import style from "./styles.module.scss";
import PropTypes from "prop-types";

export function ModalIcon({ imageSrc, imageAlt }) {
  return (
    <div className={style.ReactModal__Icon}>
      <img src={imageSrc} alt={imageAlt} />
    </div>
  )
}

ModalIcon.propTypes = {
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string
}