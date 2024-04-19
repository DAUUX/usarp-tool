import PropTypes from "prop-types";
import styles from "./styles.module.scss";

export function ModalButton({ primaryButton, secondaryButton }) {
  const buttonClass = primaryButton && secondaryButton ? 
  `${styles.ReactModal__Buttons}` :
  `${styles.ReactModal__Buttons} ${styles.ReactModal__SingleButton}`;

return (
  <div className={buttonClass}>
      {secondaryButton && (
        <button className={styles.ReactModal__Buttons_Secondary}>
          { secondaryButton.label }
        </button>
      )}
      {primaryButton && (
        <button className={styles.ReactModal__Buttons_Primary}>
          { primaryButton.label }
        </button>
      )}
    </div>
  )
}

ModalButton.propTypes = {
  primaryButton: PropTypes.shape({
    label: PropTypes.string.isRequired,
  }),
  secondaryButton: PropTypes.shape({
    label: PropTypes.string.isRequired,
  }),
};