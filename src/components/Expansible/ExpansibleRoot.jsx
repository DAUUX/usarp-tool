import { useState } from "react";
import { IconChoice } from "../../utils/IconChoice";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";

export default function ExpansibleRoot({
  children,
  usNumber,
  close,
  onRemoveClick,
  showToggleIcon = false,
  ...rest
}) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const hasRemoveAction = !!onRemoveClick;

  return (
    <div
      className={`${styles.expansible__container} ${
        expanded ? styles.expanded : ""
      }`}
    >
      <div className={styles.expansible__body} {...rest}>
        <div className={styles.expansible__detail} onClick={toggleExpanded}>
          {showToggleIcon && (
            <IconChoice
              icon="arrowdown"
              className={expanded ? styles.icon_expanded : ""}
            />
          )}
          <span>US{usNumber}</span>
        </div>
        <div className={styles.expansible__close} title={hasRemoveAction ? "Remover" : "Fechar"}>
          <IconChoice
            icon={hasRemoveAction ? "delete" : "close"}
            onClick={hasRemoveAction ? onRemoveClick : close}
          />
        </div>
      </div>
      {expanded && children}
    </div>
  );
}

ExpansibleRoot.propTypes = {
  children: PropTypes.node,
  usNumber: PropTypes.string,
  close: PropTypes.func,
  onRemoveClick: PropTypes.func, 
  showToggleIcon: PropTypes.bool,
};