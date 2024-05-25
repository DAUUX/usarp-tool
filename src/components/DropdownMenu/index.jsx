import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import style from "./styles.module.scss";
import { Option } from "./Option";
import { useAuth } from "../../hooks/useAuth";

export function Dropdown() {
  const { handleLogout } = useAuth();
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={style.DropdownTrigger} aria-label="Menu da conta">
          <img
            className={style.DropdownTrigger__ProfilePic}
            src="../../src/assets/icons/userPlaceholder.svg"
            alt="Foto do usuário"
            width="40"
            height="40"
          />
          <div className={style.DropdownTrigger__ArrowIcon} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={style.DropdownMenuContent}
          sideOffset={16}
        >
          <DropdownMenu.Item className={style.DropdownMenuContent__Item}>
            <Option
              icone={"../../src/assets/icons/profile_icon.svg"}
              iconeAlt={"Ícone de perfil do usuário"}
              link={"../configurations/profile"}
              text={"Meu perfil"}
            />
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className={style.DropdownMenuContent__Item}
            onClick={handleLogout}
          >
            <Option
              icone={"../../src/assets/icons/logout.svg"}
              iconeAlt={"Ícone de logout"}
              link={"/login"}
              text={"Sair"}
            />
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
