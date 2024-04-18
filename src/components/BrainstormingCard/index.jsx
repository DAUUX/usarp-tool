import styles from "./styles.module.scss";
import BrainstormingPng from "../../assets/images/brainstorming.png";
import { IconChoice } from "../../utils/IconChoice";
// import PropTypes from "prop-types";
export function BrainstormingCard({ ...rest }) {
  return (
    <div className={styles.brainstormingcard__container} {...rest}>
      <div className={styles.brainstormingcard__header}>
        <h6>Título do Brainstorm</h6>
        <IconChoice icon="option" />
      </div>
      <span>02/12/2023</span>
      <figure>
        <img src={BrainstormingPng} alt="" />
      </figure>
      <div className={styles.brainstormingcard__project}>
        <h6>Projeto</h6>
        <span>Nome do projeto</span>
      </div>
      <div className={styles.brainstormingcard__userstory}>
        <h6>Users Stories</h6>
        <div>
          <span style={{ background: "#FFE1D6", color: "#983E1E" }}>1</span>
          <span style={{ background: "#CCEFF0", color: "#004548" }}>2</span>
          <span style={{ background: "#FFE8B2", color: "#33270D" }}>3</span>
          <span style={{ background: "#FFE1D6", color: "#983E1E" }}>4</span>
          <span style={{ background: "#CCEFF0", color: "#004548" }}>5</span>
        </div>
      </div>
    </div>
  );
}
BrainstormingCard.propTypes = {
  // label: PropTypes.string.isRequired,
};
