import style from './styles.module.scss';
import { Link } from "react-router-dom";

export default function ToggleMenuOption({ src, alt, link, text }) {
  return (
    <li className={style.Option}>
      <Link to={link}>
        <img
          src={src}
          alt={alt}
          height="20"
          width="20" />
        <span>
          {text}
        </span>
      </Link>
    </li>
  )
}