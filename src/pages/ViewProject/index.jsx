import { useForm } from "react-hook-form";
import { Input } from "../../components/Input/indes";
import { Dropdown } from "../../components/Dropdown";
import { IconChoice } from "../../utils/IconChoice";
import styles from "./styles.module.scss";
import ViewProjectService from "./viewProject.service";
import { URL as baseURL } from "../../utils/base";
import { Button } from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FeedbackAlert } from "../../components/FeedbackAlert";
import { useAlert } from "../../hooks/useAlert";
import { useEffect, useState } from "react";

export function ViewProject() {
  const { open, close } = useAlert();
  const navigate = useNavigate();
  const { data } = ViewProjectService(baseURL + "/projeto");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(data);
  }, [data]);

  const handleOpenAlertDelete = (id) => {
    open(
      <FeedbackAlert.Root>
        <FeedbackAlert.Icon icon="warningcircle" />
        <FeedbackAlert.Title title="Aviso!" />
        <FeedbackAlert.Description
          style={{ textAlign: "center" }}
          description="Desejar apagar o projeto?"
        />
        <div style={{ display: "flex", gap: "2rem" }}>
          <Button.Root data-type="danger" onClick={close}>
            <Button.Text>Cancelar</Button.Text>
          </Button.Root>
          <Button.Root data-type="primary" onClick={() => handleDelete(id)}>
            <Button.Text>Sim, Apagar</Button.Text>
          </Button.Root>
        </div>
      </FeedbackAlert.Root>
    );
  };

  const {
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  // function getCurrentDateFormatted() {
  //   const today = new Date();

  //   const day = String(today.getDate()).padStart(2, "0");
  //   const month = String(today.getMonth() + 1).padStart(2, "0");
  //   const year = today.getFullYear();

  //   return `${day}/${month}/${year}`;
  // }
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(baseURL + "/projeto/" + id);
      // Atualiza a lista de projetos após a deleção
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== id)
      );
      close();
    } catch (error) {
      console.error("Erro ao deletar o projeto:", error);
    }
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
          <Button.Root
            data-type="primary"
            title="Nova História de Usuário"
            style={{ padding: ".8rem 1.5rem" }}
            onClick={() => navigate("/registerUserstory")}
          >
            <Button.Text>Nova História de Usuário</Button.Text>
            <Button.Icon iconName="plus" />
          </Button.Root>
        </div>
        <div className={styles.viewProject__table}>
          <table>
            <thead>
              <tr>
                <th>NOME</th>
                <th>CRIADO POR</th>
                <th>DATA DE CRIAÇÃO</th>
                <th>STATUS</th>
                <th>Histórias de Usuário</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {projects.length <= 0 ? (
                <tr>
                  <td colSpan={6}>
                    Ainda não há projetos cadastrados. Criar meu primeiro
                    projeto agora.
                  </td>
                </tr>
              ) : null}
              {projects.map((project, index) => (
                <tr key={index}>
                  <td>{project.name}</td>
                  <td>
                    <div className={styles.table__users}>
                      <IconChoice icon="develop" />
                      <span>{project.createdby.name}</span>
                    </div>
                  </td>
                  <td>
                    <span>{project.date}</span>
                  </td>
                  <td>
                    <div className={styles.table__status}>
                      <span>{project.status}</span>
                    </div>
                  </td>
                  <td>
                    <span>{project.amountUs}</span>
                  </td>
                  <td>
                    <div className={styles.table__buttons}>
                      <span title="Favoritar">
                        <IconChoice icon="star" />
                      </span>
                      <span title="Editar">
                        <Link to={`/editProject/${project.id}`}>
                          <IconChoice icon="edit" />
                        </Link>
                      </span>
                      <span
                        title="Deletar"
                        onClick={() => handleOpenAlertDelete(project.id)}
                      >
                        <IconChoice icon="delete" />
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
