import { Button } from "../../../../components/Button";
import { ButtonIcon } from "../../../../components/Button/ButtonIcon";
import { IconChoice } from "../../../../utils/IconChoice";
import styles from "./index.module.scss";
import PropTypes from "prop-types";

CardMeansurement.propTypes = {
  line: PropTypes.string,
  color: PropTypes.string,
  button: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.number,
  icon: PropTypes.string,
};

export default function CardMeansurement({line, color, button, title, value, icon}) {
  return (
    <div
      style={{ border: "1px solid " + line }}
      className={styles.card_membros}
    >
      <div className={styles.card_membro_header}>
        <IconChoice icon={icon} />
        <div>
          <h5 style={{ color: color }}>
            {value}
          </h5>
          <p>{title}</p>
        </div>
      </div>
      <div className={styles.card_membro_body}>
        <Button.Root data-type={`menber-${button}-primary`}>
          <Button.Icon icon="eyeOn" />
          <Button.Text>Ver todos</Button.Text>
        </Button.Root>
        <Button.Root data-type={`menber-${button}-outline`}>
          <Button.Icon icon="plus" />
          <Button.Text>Ver todos</Button.Text>
        </Button.Root>
      </div>
    </div>
  );
}

