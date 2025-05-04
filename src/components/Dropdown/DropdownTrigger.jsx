import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import { IconChoice } from "../../utils/IconChoice";
import { useDropdown } from "./DropdownRoot.";

DropdownTrigger.propTypes = {
  title: PropTypes.node.isRequired,
};

export function DropdownTrigger({ title, ...rest }) {
  const { isOpen, toggleDropdown, selectedValue, clearSelection } =
    useDropdown();

  return (
    <div {...rest} className={styles.dropdown_trigger} onClick={toggleDropdown}>
      {selectedValue ?? title}
      {title !== "Todos" ? (
        <IconChoice icon={isOpen ? "arrowup" : "arrowdown"} />
      ) : null}
      {selectedValue && (
        <button
          title="Limpar seleção"
          className={styles.clear_button}
          onClick={(e) => {
            e.stopPropagation();
            clearSelection();
          }}
        >
          <IconChoice icon="closecircle" />
        </button>
      )}
    </div>
  );
}
