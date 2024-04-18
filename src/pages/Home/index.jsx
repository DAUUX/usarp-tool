import { BrainstormingCard } from "../../components/BrainstormingCard";
import { ButtonBig } from "../../components/ButtonBig";
import styles from "./styles.module.scss";

export function Home() {
  return (
    <div className={styles.home__container}>
      <section>
        <div>
          <h4>
            Bem-vindo(a), <span>Mateus Andrade!</span>
          </h4>
        </div>
        <div className={styles.buttons__container}>
          <ButtonBig label={"Novo projeto"} />
        </div>
      </section>
      <section className={styles.recent__container}>
        <h4>Recentes</h4>
        <div className={styles.cards__container}>
          <BrainstormingCard />
          <BrainstormingCard />
        </div>
      </section>
    </div>
  );
}
