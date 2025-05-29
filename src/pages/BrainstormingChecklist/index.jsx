import { ChecklistHeader } from "./components/ChecklistHeader";
import styles from "./styles.module.scss";

export function BrainstormingChecklist() {
  const avatarMock = [
    {
      id: 1,
      name: "João",
      image:
        "https://images.pexels.com/photos/4493622/pexels-photo-4493622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 2,
      name: "Júlia",
      image:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 3,
      name: "Fernando",
      image:
        "https://images.pexels.com/photos/4384151/pexels-photo-4384151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 4,
      name: "Cleiton",
      image:
        "https://images.pexels.com/photos/31932094/pexels-photo-31932094/free-photo-of-candid-portrait-of-laughing-young-man-in-black-and-white.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 5,
      name: "Thaís",
      image:
        "https://images.pexels.com/photos/3790835/pexels-photo-3790835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  const avatarList = avatarMock;

  const handleSignOutSession = () => {
    console.log("saiu")
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
