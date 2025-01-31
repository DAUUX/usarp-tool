import PropTypes from "prop-types";


/**
 * Chip Component
 *
 * @param {string} label - O texto exibido no chip.
 * @param {string} color - A cor do texto.
 * @param {string} backgroundColor - A cor de fundo do chip.
 * @param {string} borderColor - A cor de borda do chip.
 * @returns {JSX.Element} - Retorna o componente Chip.
 */
export function Chip({ label, color, backgroundColor, borderColor }) {
  const chipStyle = {
    color: color,
    backgroundColor: backgroundColor,
    padding: "8px 12px",
    borderRadius: "16px",
    display: "inline-block",
    font: "600 14px 'Inter', sans-serif",
    textAlign: "center",
    border: `1px solid ${borderColor}`,
    cursor: "default",
  };

  return <div style={chipStyle}>{label}</div>;
}

// Propriedades padrão do componente
Chip.defaultProps = {
  color: "#000000",
  backgroundColor: "#e0e0e0",
  borderColor: "#000000",
};

// Validação das propriedades
Chip.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
};
