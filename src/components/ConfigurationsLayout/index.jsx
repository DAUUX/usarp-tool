import styles from "./styles.module.scss";
import { SidebarOption } from "./SidebarOption";
import { AlertBox } from "./AlertBox";
import { Link, Outlet } from "react-router-dom";
import { useState, createContext } from "react";
import { Dropdown } from "../DropdownMenu";

export const FormSubmitContext = createContext(null);

export function ConfigurationsLayout() {
  const [alert, setAlert] = useState(null);

  return (
    <>
      <header className={styles.Configuration__Header}>
        <img src="../../../src/assets/images/logo.png" alt="USARP Tool Logo" />
        <Dropdown />
      </header>
      <main className={styles.Configuration}>
        <div className={styles.Configuration__BackLink}>
            <Link to="/">
              <img src="../src/assets/icons/backArrow.svg" alt="Voltar" />
              Voltar
            </Link>
        </div>

        {alert && (
          <AlertBox message={alert.message} type={alert.type} icon={alert.icon} />
        )}

        <aside className={styles.Configuration__Sidebar}>
          <SidebarOption
            label="Configurações de perfil"
            link="./profile"
            icon="gear"
          />
          <SidebarOption
            label="Privacidade e segurança"
            link="./privacity"
            icon="lock"
          />
        </aside>
        <div className={styles.Configuration__Content}>
          <FormSubmitContext.Provider value={{setAlert}}>
            <Outlet />
          </FormSubmitContext.Provider>
        </div>
      </main>
    </>
  )
}