import { useState } from "react";
import styles from "./styles.module.scss";

export default function Checklist({ 
  onSelectGroup, 
  selectedGroup 
}) {
  const groups = [
   
  {
    id: "G1",
    title: "Status do sistema",
    items: [{ id: "M11", label: "Status do sistema"}]
  },

 {
    id: "G2",
    title: "Alerta",
    items: [{ id: "M11", label: "Preferências (M11)" }]
  },
  
  {
    id: "G3",
    title: "Cancelar",
    items: [{ id: "M5", label: "Desfazer (M5)" }],
  },
  
  {
    id: "G4",
    title: "Entrada de dados estruturada",
    items: [{ id: "M9", label: "Entrada de texto estruturada (M9)" }, { id: "M10", label: "Execução passo-a-passo (M10)" }],
  },
];

  const [openId, setOpenId] = useState(groups[0].id);
  const [checked, setChecked] = useState([]);

  const toggle = (id) => setOpenId(openId === id ? null : id);
  const handleCheck = (itemId) =>
    setChecked((prev) => (prev.includes(itemId) ? prev.filter((p) => p !== itemId) : [...prev, itemId]));

  return (
    <div className={styles.sidebarBox}>
      <h3>Checklist</h3>

      {groups.map((g) => (
        <div key={g.id} className={styles.accordionItem}>
          <button className={styles.accordionHeader} onClick={() => { toggle(g.id); if (onSelectGroup) onSelectGroup(g.title); }}>
            <span>{g.title}</span>
            <span className={styles.chev}>{openId === g.id ? "▴" : "▾"}</span>
          </button>

          {openId === g.id && (
            <div className={styles.accordionContent}>
              <p className={styles.smallDesc}>A funcionalidade pode afetar o estado do sistema</p>
              <div className={styles.items}>
                {g.items.map((it) => (
                  <label key={it.id} className={styles.item}>
                    <input type="checkbox" checked={checked.includes(it.id)} onChange={() => handleCheck(it.id)} />
                    <span>{it.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      <div className={styles.footer}>
        <button className={styles.backBtn} onClick={() => { if (onSelectGroup) onSelectGroup("Status do sistema"); }}>
          Voltar para Checklist
        </button>
      </div>
    </div>
  );
}
