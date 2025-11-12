import Sidebar from "./Sidebar";
import Card from "./Card";
import styles from "./FillCards.module.scss";
import smallLogo from "../../../assets/images/small-logo.png";
import { Text } from "../../../components/Text";
import { Button } from "../../../components/Button";
import { Avatar } from "../components/ChecklistHeader/avatar"; // ajuste o caminho se o avatar estiver em outra pasta

export default function FillCards() {
  // avatars e botão
  const avatarList = [
    { id: 1, name: "João", icon: "user02_orange" },
    { id: 2, name: "Julia", icon: "user03_orange" },
    { id: 3, name: "Fernando", icon: "user04_orange",},
    { id: 4, name: "Cleiton", icon: "user05_orange", },
    { id: 5, name: "Thaís", icon: "user06_orange", },
  ];

  function handleSignOutSession() {
    console.log("Sessão encerrada!");
  }

  //cartas
  const cardsTop = [
    {
      gi: "iD",
      id: "R1",
      category: "STATUS DO SISTEMA",
      question:
        "Para cada user story que possa afetar o status do sistema, analise se a persona deseja que o sistema notifique sobre a mudança no status do sistema. Se sim, quais são?",
      guide: "Guia de Especificação do Requisito de Usabilidade",
      context: "O status do sistema que devem ser relatados são X, XI, XII.",
    },
    {
      gi: "iD",
      id: "R2",
      category: "STATUS DO SISTEMA",
      question:
        "Para cada user story que possa gerar falhas no sistema, analise se a persona deseja que o sistema notifique essa falha. Se sim, quais são?",
      guide: "Guia de Especificação do Requisito de Usabilidade",
      context:
        "O sistema precisará de feedback sobre as falhas I, II, III que ocorrem nessa user story.",
    },
  ];

  const cardsBottom = [
    {
      gi: "iD",
      id: "PR1",
      category: "STATUS DO SISTEMA",
      question:
        "Quais informações sobre status do sistema são críticas para persona e não podem passar despercebidas?",
      guide: "Guia de Especificação do Complemento de Prototipação",
      context:
        "Para as informações destacadas, sugere-se que sejam exibidas no formato invasivo na área principal.",
    },
    {
      gi: "iD",
      id: "PR2",
      category: "STATUS DO SISTEMA",
      question:
        "Quais informações sobre o status do sistema estão relacionadas a uma situação importante, mas não crítica?",
      guide: "Guia de Especificação do Complemento de Prototipação",
      context:
        "As informações relacionadas às falhas III, IV, etc, devem ser mostradas no formato destacado.",
    },
    {
      gi: "iD",
      id: "PR3",
      category: "STATUS DO SISTEMA",
      question:
        "Quais informações sobre o status do sistema serão simplesmente exibidas na área de status?",
      guide: "Guia de Especificação do Complemento de Prototipação",
      context:
        "Essas informações devem ter algum tipo de relevância visual na área de status do sistema.",
    },
  ];

  return (
    <div className={styles.page}>
      
      <header className={styles.header}>
        <div className={styles.brainstorming__header__info__container}>
          <img src={smallLogo} alt="Usarp Logo" className={styles.smallLogo} />
          <div className={styles.title__container}>
            <Text.Root>
              <Text.Headline as="h6">Brainstorming 1</Text.Headline>
              <Text.Caption>
                <span className={styles.subtitle}>Exportar requisitos</span>
              </Text.Caption>
            </Text.Root>
          </div>
        </div>

        <div className={styles.actions__container}>
          <div className={styles.avatar_container}>
            {avatarList.map((avatar) => (
              <Avatar key={avatar.id} icon={avatar.icon} />
            ))}
          </div>
          <div>
            <Button.Root
              data-type="primary"
              className={styles.button__outline}
              onClick={handleSignOutSession}
            >
              <Button.Text>Sair da sessão</Button.Text>
            </Button.Root>
          </div>
        </div>
      </header>

      
      <div className={styles.userStoryBox}>
        <button className={styles.arrowBtn}>&lt;</button>
        <span className={styles.userStoryText}>
          US001 - Cadastro de usuário no sistema
        </span>
        <button className={styles.arrowBtn}>&gt;</button>
      </div>

      
      <div className={styles.content}>
        <Sidebar />
        <main className={styles.main}>
          {/* CARTAS AZUIS */}
          <div className={styles.cardGridTop}>
            {cardsTop.map((card, index) => (
              <div key={index} className={styles.cardWrapper}>
                <Card {...card} color="azul" />
                <textarea className={styles.textarea}></textarea>
              </div>
            ))}
          </div>

          {/* CARTAS LARANJAS */}
          <div className={styles.cardGridBottom}>
            {cardsBottom.map((card, index) => (
              <div key={index} className={styles.cardWrapper}>
                <Card {...card} color="laranja" />
                <textarea className={styles.textarea}></textarea>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
