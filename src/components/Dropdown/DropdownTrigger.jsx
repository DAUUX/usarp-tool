import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import { useDropdown } from "./DropdownContext";
import { IconChoice } from "../../utils/IconChoice";

DropdownTrigger.propTypes = {
  title: PropTypes.node.isRequired,
};

export function DropdownTrigger({ title, ...rest }) {
  const { isOpen, toggleDropdown, selectedValue } = useDropdown();

  return (
    <div {...rest} className={styles.dropdown_trigger} onClick={toggleDropdown}>
      {selectedValue ?? title}
      {title !== "Todos" ? (
        <IconChoice icon={isOpen ? "arrowup" : "arrowdown"} />
      ) : null
      }
    </div>
  );
}
