import { useState } from "react";
import { ChecklistHeader } from "./components/ChecklistHeader";
import styles from "./styles.module.scss";
import Checklist from "./components/Checklist";

export function BrainstormingChecklist() {
  const avatarMock = [
    {
      id: 1,
      name: "João",
      icon: "user02_orange",
    },
    {
      id: 2,
      name: "Júlia",
      icon: "user03_orange",
    },
    {
      id: 3,
      name: "Fernando",
      icon: "user04_orange",
    },
    {
      id: 4,
      name: "Cleiton",
      icon: "user05_orange",
    },
    {
      id: 5,
      name: "Thaís",
      icon: "user06_orange",
    },
  ];

  const avatarList = avatarMock;

  const accordionItems = {
    groups: [
      {
        id: "G1",
        title: "Feedback do sistema",
        checkboxGroups: [
          {
            id: "G1.1",
            caption: "A funcionalidade pode afetar o estado do sistema",
            checkboxs: [
              {
                id: "M1",
                text: "Status do sistema",
              },
              {
                id: "M2",
                text: "Interação",
              },
              {
                id: "M4",
                text: "Feedback sobre o progresso",
              },
            ],
          },
          {
            id: "G1.2",
            caption:
              "A funcionalidade tem consequências relevantes para a persona",
            checkboxs: [
              {
                id: "M3",
                text: "Alerta",
              },
            ],
          },
        ],
      },
      {
        id: "G2",
        title: "Personalização do sistema",
        checkboxGroups: [
          {
            id: "G2.1",
            caption: "A persona deseja favoritar elementos ou funções",
            checkboxs: [
              {
                id: "M13",
                text: "Funções",
              },
            ],
          },
          {
            id: "G2.2",
            caption: "A persona deseja personalizar o sistema",
            checkboxs: [
              {
                id: "M11",
                text: "Preferências",
              },
              {
                id: "M12",
                text: "Area de objetos pessoais",
              },
              {
                id: "M4",
                text: "Feedback sobre progresso",
              },
            ],
          },
        ],
      },
      {
        id: "G3",
        title: "Controle e suporte ao usuário",
        checkboxGroups: [
          {
            id: "G3.1",
            caption:
              "A funcionalidade envolve diferentes páginas ou interfaces",
            checkboxs: [
              {
                id: "M8",
                text: "Voltar",
              },
            ],
          },
          {
            id: "G3.2",
            caption: "A persona pode cancelar ou desfazer ações",
            checkboxs: [
              {
                id: "M5",
                text: "Desfazer",
              },
              {
                id: "M6",
                text: "Abortar operação",
              },
              {
                id: "M7",
                text: "Cancelar",
              },
            ],
          },
          {
            id: "G3.3",
            caption:
              "A persona necessita de conteúdos de ajuda para utilizar a funcionalidade",
            checkboxs: [
              {
                id: "M14",
                text: "Ajuda multinível",
              },
            ],
          },
        ],
      },
      {
        id: "G4",
        title: "Entrada de dados do usuário",
        checkboxGroups: [
          {
            id: "G4.1",
            caption: "A funcionalidade requer dados em formatos específicos",
            checkboxs: [
              {
                id: "M9",
                text: "Entrada de texto estruturada",
              },
            ],
          },
          {
            id: "G4.2",
            caption:
              "A funcionalidade requer diferentes passos com entrada de dados",
            checkboxs: [
              {
                id: "M10",
                text: "Execução passo-a-passo",
              },
            ],
          },
        ],
      },
    ],
  };

  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheck = (id) => {
    setCheckedItems((prev) => {
      const isChecked = prev.includes(id);
      const newList = isChecked
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id];
      return newList;
    });
  };

  const handleSignOutSession = () => {
    console.log("saiu");
  };
  return (
    <div className={styles.brainstormingChecklist__container}>
      <ChecklistHeader
        avatarList={avatarList}
        handleSignOutSession={handleSignOutSession}
      />
      <main className={styles.content}>
        <Checklist
          accordionItems={accordionItems}
          checkedItems={checkedItems}
          handleCheck={handleCheck}
        />
      </main>
    </div>
  );
}
