import { IconChoice } from "../../utils/IconChoice";
import styles from "./styles.module.scss";

export function DetailProject() {
  return (
    <div className={styles.detailProject}>
      <header>
        <span aria-labelledby="title">
          <IconChoice icon="back" />
          <h6 id="title">Detalhes do projeto</h6>
        </span>
      </header>
      <main>
        <div className={styles.title}>
          <h5>Nome do projeto</h5>
          <div>
            <span>
              <IconChoice icon="star" />
            </span>
            <span>
              <IconChoice icon="edit" />
            </span>
            <span>
              <IconChoice icon="delete" />
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
