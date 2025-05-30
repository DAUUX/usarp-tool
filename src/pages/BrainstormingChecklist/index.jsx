import { ChecklistHeader } from "./components/ChecklistHeader";
import styles from "./styles.module.scss";

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

  const handleSignOutSession = () => {
    console.log("saiu");
  };
  return (
    <div className={styles.brainstormingChecklist__container}>
      <ChecklistHeader
        avatarList={avatarList}
        handleSignOutSession={handleSignOutSession}
      />
    </div>
  );
}
