import { useState } from "react";

import Sidebar from "./Sidebar";
import Card from "./Card";
import styles from "./FillCards.module.scss";

import smallLogo from "../../../assets/images/small-logo.png";
import { Text } from "../../../components/Text";
import { Button } from "../../../components/Button";
import { Avatar } from "../components/ChecklistHeader/avatar";

import { api } from "../../../utils/axios.config";

import warningIcon from "../../../assets/icons/ate.png";
import successIcon from "../../../assets/icons/icon.jpg";





export default function FillCards() {
  // -----------------------------
  // ESTADOS
  // -----------------------------
  const [answers, setAnswers] = useState({});
  const [showExitModal, setShowExitModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // -----------------------------
  // AVATARES
  // -----------------------------
  const avatarList = [
    { id: 1, name: "João", icon: "user02_orange" },
    { id: 2, name: "Julia", icon: "user03_orange" },
    { id: 3, name: "Fernando", icon: "user04_orange" },
    { id: 4, name: "Cleiton", icon: "user05_orange" },
    { id: 5, name: "Thaís", icon: "user06_orange" },
  ];

  // -----------------------------
  // CARTAS
  // -----------------------------
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

  // -----------------------------
  // US027 – AO CLICAR EM SAIR
  // -----------------------------
  function handleExitClick() {
    const hasAnyAnswer = Object.values(answers).some(
      (text) => text && text.trim() !== ""
    );

    if (!hasAnyAnswer) return;

    setShowExitModal(true);
  }

  // -----------------------------
  // SALVAR E SAIR
  // -----------------------------
  async function handleSaveAndExit() {
    setIsSaving(true);

    try {
      for (const cardId in answers) {
        const text = answers[cardId];
        if (!text || !text.trim()) continue;
        console.log("ENVIANDO:", {
          brainstorming: "mock-brainstorming-id",
          userStory: "US001",
          cardId,
          text,
        });
        await api.post(
          `/brainstormings/mock-brainstorming-id/user-stories/US001/cards/${cardId}/notes`,
          { text }
        );
      }

      setShowExitModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  }

  // -----------------------------
  // RENDER
  // -----------------------------
  return (
    <div className={styles.page}>
      {/* HEADER */}
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

          <Button.Root
            data-type="primary"
            className={styles.button__outline}
            onClick={handleExitClick}
          >
            <Button.Text>Sair da sessão</Button.Text>
          </Button.Root>
        </div>
      </header>

      {/* CONTEÚDO */}
      <div className={styles.content}>
        <Sidebar />

        <main className={styles.main}>
          <div className={styles.cardGridTop}>
            {cardsTop.map((card) => (
              <div key={card.id} className={styles.cardWrapper}>
                <Card {...card} color="azul" />
                <textarea
                  className={styles.textarea}
                  value={answers[card.id] || ""}
                  onChange={(e) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [card.id]: e.target.value,
                    }))
                  }
                />
              </div>
            ))}
          </div>

          <div className={styles.cardGridBottom}>
            {cardsBottom.map((card) => (
              <div key={card.id} className={styles.cardWrapper}>
                <Card {...card} color="laranja" />
                <textarea
                  className={styles.textarea}
                  value={answers[card.id] || ""}
                  onChange={(e) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [card.id]: e.target.value,
                    }))
                  }
                />
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* POP-UP ATENÇÃO */}
      {showExitModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <div className={styles.iconWrapperWarning}>
              <img src={warningIcon} alt="Alerta" />
            </div>

            <h3>Atenção!</h3>
            <p>
              Você possui informações que não foram salvas. Deseja salvar antes de sair?
            </p>

            <div className={styles.modalButtonsTwo}>
              <button
                className={styles.cancelBtn}
                onClick={() => setShowExitModal(false)}
              >
                Permanecer na sessão
              </button>

              <button
                className={styles.saveBtn}
                onClick={handleSaveAndExit}
                disabled={isSaving}
              >
                {isSaving ? "Salvando..." : "Salvar e Sair da sessão"}
              </button>
            </div>
          </div>
        </div>
      )}



      {showSuccessModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <div className={styles.iconWrapperSuccess}>
              <img src={successIcon} alt="Sucesso" />
            </div>

            <h3>Sessão salva!</h3>
            <p>As cartas foram salvas com sucesso.</p>

            <div className={styles.modalButtonsOne}>
              <button
                className={styles.okBtn}
                onClick={() => setShowSuccessModal(false)}
              >
                OK, fechar
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
