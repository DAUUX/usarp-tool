import Sidebar from "./Sidebar";
import Card from "./Card";
import styles from "./FillCards.module.scss";
import logo from "../../../assets/logo.png";
import logo2 from "../../../assets/logo2.png";


export default function FillCards() {
  const cardsTop = [
    {
      gi: "iD",
      id: "R1",
      category: "STATUS DO SISTEMA",
      question: "Para cada user story que possa afetar o status do sistema, analise se a persona deseja que o sistema notifique sobre a mudança no status do sistema. Se sim, quais são?",
      guide: "Guia de Especificação do Requisito de Usabilidade",
      context: "O status do sistema que devem ser relatados são X, XI, XII.",
    },
    {
      gi: "iD",
      id: "R2",
      category: "STATUS DO SISTEMA",
      question: "Para cada user story que possa gerar falhas no sistema, analise se a persona deseja que o sistema notifique essa falha. Se sim, quais são?",
      guide: "Guia de Especificação do Requisito de Usabilidade",
      context: "O sistema precisará de feedback sobre as falhas I, II, III que ocorrem nessa user story.",
    },
  ];

  const cardsBottom = [
    {
      gi: "iD",
      id: "PR1",
      category: "STATUS DO SISTEMA",
      question: "Quais informações sobre status do sistema são críticas para persona e não podem passar despercebidas?",
      guide: "Guia de Especificação do Complemento de Prototipação",
      context: "Para as informações destacadas, sugere-se que sejam exibidas no formato invasivo na área principal.",
    },
    {
      gi: "iD",
      id: "PR2",
      category: "STATUS DO SISTEMA",
      question: "Quais informações sobre o status do sistema estão relacionadas a uma situação importante, mas não crítica?",
      guide: "Guia de Especificação do Complemento de Prototipação",
      context: "As informações relacionadas às falhas III, IV, etc, devem ser mostradas no formato destacado.",
    },
    {
      gi: "iD",
      id: "PR3",
      category: "STATUS DO SISTEMA",
      question: "Quais informações sobre o status do sistema serão simplesmente exibidas na área de status?",
      guide: "Guia de Especificação do Complemento de Prototipação",
      context: "Essas informações devem ter algum tipo de relevância visual na área de status do sistema.",
    },
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <img src={logo} alt="Logo" className={styles.logo} />
          <div>
            <h3>Brainstorming 1</h3>
            <p>Exportar requisitos</p>
          </div>
        </div>
        <div className={styles.headerRight}>          
          <img src={logo2} alt="Logo2" className={styles.logo2} />
          <button className={styles.logoutBtn}>Sair da sessão</button>
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
          

          {/* Cartas azuis */}
          <div className={styles.cardGridTop}>
            {cardsTop.map((card, index) => (
              <div key={index} className={styles.cardWrapper}>
                <Card {...card} color="azul" />
                <textarea
                  placeholder="Os status do sistema que devem ser relatados são x, xi, xii "
                  className={styles.textarea}
                ></textarea>
              </div>
            ))}
          </div>

          {/* Cartas laranjas */}
          <div className={styles.cardGridBottom}>
            {cardsBottom.map((card, index) => (
              <div key={index} className={styles.cardWrapper}>
                <Card {...card} color="laranja" />
                <textarea
                  placeholder="Os status do sistema que devem ser relatados são x, xi, xii"
                  className={styles.textarea}
                ></textarea>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
