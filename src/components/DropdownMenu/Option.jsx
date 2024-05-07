import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export function Option({ icone, iconeAlt, link, text }) {
  return (
      <Link to={link}>
        <img
          src={icone}
          alt={iconeAlt}
          height="20"
          width="20" />
        <span>
          {text}
        </span>
      </Link>
  )
}
Option.propTypes = {
  icone: PropTypes.string,
  iconeAlt: PropTypes.string,
  link: PropTypes.string,
  text: PropTypes.string
}