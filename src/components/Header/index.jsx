import styles from './styles.module.scss';
import ToggleMenu from '../ToggleMenu';

export default function Header() {
  return <header styles={styles}>
    <h6>Bem-vindo(a), <span>Fulano!</span></h6>
    <ToggleMenu />
  </header>
}