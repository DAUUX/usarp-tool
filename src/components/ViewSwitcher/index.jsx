import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import { IconChoice } from "../../utils/IconChoice";  

export function ViewSwitcher({ currentView, showListView, showCardView }) {
  return (
    <div className={styles.viewSwitcher}>
      <button
        className={currentView === 'list' ? styles.active : ''}
        onClick={showListView}
      >
        <IconChoice icon="list" />
      </button>
      <button
        className={currentView === 'card' ? styles.active : ''}
        onClick={showCardView}
      >
        <IconChoice icon="grid" />
      </button>
    </div>
  );
}

ViewSwitcher.propTypes = {
  currentView: PropTypes.oneOf(['list', 'card']).isRequired,
  showListView: PropTypes.func.isRequired,
  showCardView: PropTypes.func.isRequired,
};