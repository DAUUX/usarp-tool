import PropTypes from "prop-types";
import styles from "./styles.module.scss";

/**
 * FeedbackAlertDescription Component
 *
 * @param {string} description - Descrição a ser exibida (pode conter HTML).
 * @param {object} rest - Outras propriedades passadas para o elemento.
 * @returns {JSX.Element} - Retorna a descrição do FeedbackAlert.
 */
export function FeedbackAlertDescription({ description, ...rest }) {
  return (
    <h4
      className={styles.feedbackAlert__description}
      {...rest}
      dangerouslySetInnerHTML={{ __html: description }}
    />
  );
}

FeedbackAlertDescription.propTypes = {
  description: PropTypes.string.isRequired,
};
