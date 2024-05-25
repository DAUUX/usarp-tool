import { useNavigate } from "react-router-dom";
import { BrainstormingCard } from "../../components/BrainstormingCard";
import { ButtonBig } from "../../components/ButtonBig";
import { Dropdown } from "../../components/DropdownMenu";
import { useAuth } from "../../hooks/useAuth";
import { IconChoice } from "../../utils/IconChoice";
import styles from "./styles.module.scss";

export function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const routeRegisterProject = "/registerProject";
  const routeRegisterBrainstorming = "/registerBrainstorming";
  
  const handleNavegateRegisterBrainstorming = () =>{
    navigate(routeRegisterBrainstorming);
  }

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
          <ButtonBig.Root
            data-type="primary"
            onClick={() => navigate(routeRegisterProject)}
          >
            <IconChoice icon="folder" />
            <ButtonBig.Text>Novo Projeto</ButtonBig.Text>
          </ButtonBig.Root>
          <ButtonBig.Root
            data-type="secundary"
            on
            onClick={handleNavegateRegisterBrainstorming}
          >
            <IconChoice icon="lamp" />
            <ButtonBig.Text>Novo Brainstorming</ButtonBig.Text>
          </ButtonBig.Root>
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