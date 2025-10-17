import styles from "./styles.module.scss";
import { SidebarOption } from "./SidebarOption";
import { AlertBox } from "./AlertBox";
import { Link, Outlet } from "react-router-dom";
import { useState, createContext } from "react";
import { Dropdown } from "../DropdownMenu";
import { Button } from "../Button";
import { images } from "../../assets/images/images";

export const FormSubmitContext = createContext(null);

export function ConfigurationsLayout() {
  const [alert, setAlert] = useState(null);

  return (
    <>
      <main className={styles.Configuration}>
        <header className={styles.Configuration__Header}>
          <img src={images.pixelLogo} alt="USARP Tool Logo" />
          <Dropdown />
        </header>
        <div className={styles.Configuration__BackLink}>
          <Link to="/">
            <img src="../src/assets/icons/backArrow.svg" alt="Voltar" />
            Voltar
          </Link>
        </div>

        {alert && <AlertBox message={alert.message} type={alert.type} icon={alert.icon} />}

        <div className={styles.Configuration__Wrapper}>
          <aside className={styles.Configuration__Sidebar}>
            <SidebarOption label="Configurações de perfil" link="./profile" icon="gear" />
            <SidebarOption label="Privacidade e segurança" link="./privacity" icon="lock" />
            <Button.Root className={styles.Configuration__Button} onClick={close}>
              <Button.Icon iconName="delete" className={styles.Configuration__IconButton}></Button.Icon>
              <Button.Text>Excluir conta</Button.Text>
            </Button.Root>
          </aside>
          <div className={styles.Configuration__Content}>
            <FormSubmitContext.Provider value={{ setAlert }}>
              <Outlet />
            </FormSubmitContext.Provider>
          </div>
        </div>
      </main>
    </>
  );
}
