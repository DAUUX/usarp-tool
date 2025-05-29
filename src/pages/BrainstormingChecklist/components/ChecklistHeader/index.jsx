import styles from "../../styles.module.scss";
import smallLogo from "../../../../assets/images/small-logo.png";
import { Text } from "../../../../components/Text";
import { Button } from "../../../../components/Button";

export function ChecklistHeader({ avatarList, handleSignOutSession }) {
  return (
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
            <img
              className={styles.avatar}
              src={avatar.image}
              alt={avatar.name}
            />
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
  );
}
