import styles from './styles.module.scss';
import { Dropdown } from '../DropdownMenu';

export default function Header() {
  return <header styles={styles}>
    <h6>
      Bem-vindo(a), <span>Fulano!</span>
    </h6>
    <Dropdown />
  </header>
}