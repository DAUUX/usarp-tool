import { useNavigate } from "react-router-dom";
import { BrainstormingCard } from "../../components/BrainstormingCard";
import { ButtonBig } from "../../components/ButtonBig";
import { Dropdown as DropdownMenu } from "../../components/DropdownMenu";
import { Dropdown } from "../../components/Dropdown";
import { useAuth } from "../../hooks/useAuth";
import { IconChoice } from "../../utils/IconChoice";
import styles from "./styles.module.scss";
import { URL as baseURL } from "../../utils/base";
import HomeService from "./home.service";
import { useTranslation } from "react-i18next";

export function Home() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { listBrainstorming } = HomeService(baseURL);
  const routeRegisterProject = "/registerProject";
  const routeRegisterBrainstorming = "/registerBrainstorming";

  const handleNavegateRegisterBrainstorming = () => {
    navigate(routeRegisterBrainstorming);
  };

  const handletranslate = (value) => {
    i18n.changeLanguage(value);
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };
  return (
    <div className={styles.home__container}>
      <section>
        <div className={styles.home__}>
          <h4>
            {t("loginAlertSucesso")}, <span>{user.fullName}!</span>
          </h4>
          <div>
            <Dropdown.Root style={{ marginRight: "2rem" }}>
              <Dropdown.Trigger title="Idioma" />
              <Dropdown.Menu style={{ minWidth: "auto" }}>
                <Dropdown.Item value="pt">
                  <span onClick={() => handletranslate("pt")}>Português</span>
                </Dropdown.Item>
                <Dropdown.Item value="en" onClick={() => handletranslate("en")}>
                  <span onClick={() => handletranslate("en")}>Inglês</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Root>
            <DropdownMenu />
          </div>
        </div>
        <div className={styles.buttons__container}>
          <ButtonBig.Root
            data-type="primary"
            onClick={() => navigate(routeRegisterProject)}
          >
            <IconChoice icon="folder" />
            <ButtonBig.Text>{t("homeButaoNovoProjeto")}</ButtonBig.Text>
          </ButtonBig.Root>
          <ButtonBig.Root
            data-type="secundary"
            onClick={handleNavegateRegisterBrainstorming}
          >
            <IconChoice icon="lamp" />
            <ButtonBig.Text>{t("homeButaoNovoBrainstorming")}</ButtonBig.Text>
          </ButtonBig.Root>
        </div>
      </section>
      <section className={styles.recent__container}>
        <h4>{t("homeRecentes")}</h4>
        <div className={styles.cards__container}>
          {listBrainstorming.length === 0 ? (
            <h4>
              {t("homeSemBrainstormingPart1")}
              <span>{t("homeSemBrainstormingPart2")}</span>
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
