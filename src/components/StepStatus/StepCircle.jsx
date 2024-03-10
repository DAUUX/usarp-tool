import PropTypes from "prop-types";
export function StepCircle({ text, color, background }) {
  return (
    <svg
      width="48"
      height="49"
      viewBox="0 0 48 49"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="24" cy="24.25" r="24" fill={background} />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill={color}
      >
        {text}
      </text>
    </svg>
  );
}
StepCircle.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  background: PropTypes.string,
};
