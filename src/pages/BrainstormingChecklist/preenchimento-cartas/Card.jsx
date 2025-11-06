import styles from "./Card.module.scss";

export default function Card({ gi, id, category, question, guide, context, color }) {
  return (
    <div className={`${styles.card} ${styles[color]}`}>
      <div className={styles.header}>{category}</div>

      <div className={styles.title}>Questão</div>
      <p className={styles.text}>{question}</p>

      <div className={styles.guide}>
        <div className={styles.guideTitle}>{guide}</div>
        
      </div>

      <div className={styles.statusBox}>
        <p className={styles.guideInfo}>
          As informações a seguir devem ser instanciadas na Conversa da User Story.
        </p>
        {context}
        
      </div>

      <div className={styles.icons}>
        {gi && <div className={styles.icon}>{gi}</div>}
        <div className={styles.icon}>{id}</div>
      </div>
    
    </div>
     
    

  );
}
