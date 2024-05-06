import styles from "./styles.module.scss";

export function DataView({ legend, data, id, ...rest }) {
  return (
    <div className={styles.Profile__UserData__View}>
      <legend tabIndex="0" htmlFor={id}>{legend}</legend>
      <span tabIndex="0" id={id} {...rest}>{data}</span>
    </div>
  )
}