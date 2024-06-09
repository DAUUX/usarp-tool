import { useNavigate } from "react-router-dom";
import { BrainstormingCard } from "../../components/BrainstormingCard";
import { ButtonBig } from "../../components/ButtonBig";
import { Dropdown } from "../../components/DropdownMenu";
import { useAuth } from "../../hooks/useAuth";
import { IconChoice } from "../../utils/IconChoice";
import styles from "./styles.module.scss";
import { URL as baseURL } from "../../utils/base";
import HomeService from "./home.service";

export function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { listBrainstorming } = HomeService(baseURL);
  const routeRegisterProject = "/registerProject";
  const routeRegisterBrainstorming = "/registerBrainstorming";

  const handleNavegateRegisterBrainstorming = () => {
    navigate(routeRegisterBrainstorming);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  // date: "2024-06-07";
  // hours: "20:25";
  // id: 1;
  // project: "Ivy children";
  // title: "Telas";
  // userStory: "US2, US1";
  return (
    <div className={styles.home__container}>
      <section>
        <div className={styles.home__}>
          <h4>
            Bem-vindo(a), <span>{user.fullName}!</span>
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
          {listBrainstorming.length === 0 ? (
            <h4>
              Ainda não há nada aqui.
              <span> Crie seu primeiro brainstorming agora.</span>
            </h4>
          ) : (
            listBrainstorming.map((brainstorming) => (
              <BrainstormingCard
                key={brainstorming.id}
                brainstormingName={brainstorming.title}
                projectName={brainstorming.project}
                date={formatDate(brainstorming.date)}
                hour={brainstorming.hours}
                userStory={brainstorming.userStory}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
