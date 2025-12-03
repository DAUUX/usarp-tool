import PropTypes from "prop-types";
export function StepLine({ width, color }) {
  return (
    <svg
      width="88"
      height="2"
      viewBox="0 0 88 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line y1="0.75" x2="88" y2="0.75" stroke={color} strokeWidth={width} />
    </svg>
  );
}
StepLine.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
};
