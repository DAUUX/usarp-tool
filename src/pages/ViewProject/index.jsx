import { useForm } from "react-hook-form";
import { Input } from "../../components/Input/indes";
import { InputCombobox } from "../../components/InputCombobox";
import styles from "./styles.module.scss";
import { Dropdown } from "../../components/Dropdown";
import { IconChoice } from "../../utils/IconChoice";

export function ViewProject() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
function getCurrentDateFormatted() {
  const today = new Date();

  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  return `${day}/${month}/${year}`;
}
  const handleSubmitForm = (body) => {
    console.log(body);
    // axios
    //   .post(baseURL + "/auth/signin", body)
    //   .then((response) => {
    //     const token = response.data.token;
    //     setToken(token);
    //     handleOpenAlertSuccess();
    //     setTimeout(() => {
    //       close();
    //       navigate("/login");
    //     }, 6000);
    //   })
    //   .catch((err) => {
    //     if (err.code === "ERR_NETWORK") {
    //       handleOpenAlertError();
    //     }
    //     handleOpenToastError();
    //   });
  };

  return (
    <div className={styles.viewProject__container}>
      <header>
        <span title="voltar">
          <h4>Projeto</h4>
        </span>
        <Input.Root
          style={{ width: "30%" }}
          placeholder="Pesquisar projeto"
          type="search"
        />
      </header>
      <div className={styles.viewProject__content}>
        <div className={styles.viewProject__filter}>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <Dropdown.Root default={true}>
              <Dropdown.Trigger title="Todos" />
              {/* <Dropdown.Menu>
                <Dropdown.Item value="todos">All</Dropdown.Item>
              </Dropdown.Menu> */}
            </Dropdown.Root>
            <Dropdown.Root>
              <Dropdown.Trigger title="Recentes" />
              <Dropdown.Menu>
                <Dropdown.Item value="Vistos recentemente">
                  Vistos recentemente
                </Dropdown.Item>
                <Dropdown.Item value="Não vistos nos últimos 30 dias">
                  Não vistos nos últimos 30 dias
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Root>
            <Dropdown.Root>
              <Dropdown.Trigger title="Favoritos" />
              <Dropdown.Menu>
                <Dropdown.Item value="Ordem alfabética (A-Z)">
                  Ordem alfabética (A-Z)
                </Dropdown.Item>
                <Dropdown.Item value="Ordem alfabética (Z-A)">
                  Ordem alfabética (Z-A)
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Root>
            <Dropdown.Root>
              <Dropdown.Trigger title="Data de criação" />
              <Dropdown.Menu>
                <Dropdown.Item value="Criados recentemente">
                  Criados recentemente
                </Dropdown.Item>
                <Dropdown.Item value="Mais antigos">Mais antigos</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Root>
          </form>
        </div>
        <div className={styles.viewProject__table}>
          <table>
            <thead>
              <tr>
                <th>NOME</th>
                <th>CRIADO POR</th>
                <th>DATA DE CRIAÇÃO</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Projeto 1</td>
                <td>
                  <div className={styles.table__users}>
                    <IconChoice icon="develop" />
                    <span>Erik Beran</span>
                  </div>
                </td>
                <td>
                  <span>{getCurrentDateFormatted()}</span>
                </td>
                <td>
                  <div className={styles.table__status}>
                    <span>Novo</span>
                  </div>
                </td>
                <td>
                  <div className={styles.table__buttons}>
                    <span title="Favoritar">
                      <IconChoice icon="star" />
                    </span>
                    <span title="Editar">
                      <IconChoice icon="edit" />
                    </span>
                    <span title="Deletar">
                      <IconChoice icon="delete" />
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
