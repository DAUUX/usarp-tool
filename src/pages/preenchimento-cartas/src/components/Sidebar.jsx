import { useState } from "react";
import styles from "./Sidebar.module.scss";

export default function Sidebar() {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    "Status do sistema",
    "Alerta",
    "Cancelar",
    "Entrada de dado estruturada",
  ];

  return (
    <div className={styles.sidebar}>
      <h3>Preenchimento das cartas</h3>

      {options.map((opt) => (
        <div
          key={opt}
          className={`${styles.option} ${
            selectedOption === opt ? styles.selected : ""
          }`}
          onClick={() => setSelectedOption(opt)}
        >
          <span>{opt}</span>
          {selectedOption === opt && <span className={styles.check}>✔</span>}
        </div>
      ))}
      <button className={styles.backBtn}>Voltar para Checklist</button>
    </div>
  );
}
