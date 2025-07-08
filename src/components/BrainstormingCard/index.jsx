import styles from "./styles.module.scss";
import BrainstormingPng from "../../assets/images/brainstorming.png";
import { IconChoice } from "../../utils/IconChoice";
import PropTypes from "prop-types";
export function BrainstormingCard({
  brainstormingName,
  projectName,
  date,
  hour,
  userStory,
  actions,
  ...rest
}) {
  const style = [
    { background: "#FFE8B2", color: "#33270D" },
    { background: "#FFE1D6", color: "#983E1E" },
    { background: "#CCEFF0", color: "#004548" },
  ];
  
  const getRandomStyle = () => {
    return style[Math.floor(Math.random() * style.length)];
  };

  return (
    <div className={styles.brainstormingcard__container} {...rest}>
      <div className={styles.brainstormingcard__header}>
        <h6>{brainstormingName}</h6>
        <IconChoice icon="option" />
      </div>
      <span>
        {date} - {hour}
      </span>
      <figure>
        <img src={BrainstormingPng} alt="" />
      </figure>
      <div className={styles.brainstormingcard__project}>
        <h6>Projeto</h6>
        <span>{projectName}</span>
      </div>
      <div className={styles.brainstormingcard__userstory}>
        <h6>Histórias de Usuário</h6>
        <div>
          {userStory.split(", ").map((i, index) => {
            const randomStyle = getRandomStyle();
            return (
              <span key={index} style={randomStyle}>
                {i}
              </span>
            );
          })}
          {/* <span style={{ background: "#CCEFF0", color: "#004548" }}>2</span>
          <span style={{ background: "#FFE8B2", color: "#33270D" }}>3</span>
          <span style={{ background: "#FFE1D6", color: "#983E1E" }}>4</span>
          <span style={{ background: "#CCEFF0", color: "#004548" }}>5</span> */}
        </div>
      </div>

      {actions}

    </div>
  );
}
BrainstormingCard.propTypes = {
  brainstormingName: PropTypes.string.isRequired,
  projectName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  hour: PropTypes.string.isRequired,
  userStory: PropTypes.string.isRequired,
  actions: PropTypes.node,
};
