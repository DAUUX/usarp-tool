import { BrainstormingCard } from "../../components/BrainstormingCard";
import { ButtonBig } from "../../components/ButtonBig";
import { Dropdown } from "../../components/DropdownMenu";
import { useAuth } from "../../hooks/useAuth";
import styles from "./styles.module.scss";

export function Home() {
  const { user } = useAuth();
  return (
    <div className={styles.home__container}>
      <section>
        <div className={styles.home__}>
          <h4>
            Bem-vindo(a), <span>{user.fullname}!</span>
          </h4>
          <Dropdown />
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