import PropTypes from 'prop-types';
import styles from "./styles.module.scss";
import { IconChoice } from '../../utils/IconChoice';

export default function Wrapper({ children }) {
  return(
    <main className={styles.wrapper}>
      <div className={styles.card}>
        <figure>
          <IconChoice icon="usarp" color=""/>
        </figure>
        {children}
      </div>
    </main>
  );
}

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};