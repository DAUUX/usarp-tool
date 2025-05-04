import { useForm } from "react-hook-form";
import { Input } from "../../components/Input/indes";
import { Dropdown } from "../../components/Dropdown";
import { IconChoice } from "../../utils/IconChoice";
import { URL as baseURL } from "../../utils/base";
import { Button } from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { FeedbackAlert } from "../../components/FeedbackAlert";
import { useAlert } from "../../hooks/useAlert";
import { Text } from "../../components/Text";
import { useRef, useState, useCallback, useEffect } from "react";
import { Pagination } from "../../components/Pagination";
import ViewProjectService from "./viewProject.service";
import axios from "axios";
import styles from "./styles.module.scss";

export function ViewProject() {
  const path = "/project/owned-projects";
  const navigate = useNavigate();
  const { open, close } = useAlert();
  const {
    data: projects,
    pagination,
    setPagination,
    setFilters,
  } = ViewProjectService(baseURL + path);

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(baseURL + "/projeto/" + id);
      // Atualiza a lista de projetos após a deleção
      // setProjects((prevProjects) =>
      //   prevProjects.filter((project) => project.id !== id)
      // );
      close();
    } catch (error) {
      console.error("Erro ao deletar o projeto:", error);
    }
  };

  // Filtros de pesquisa
  const [searchValue, setSearchValue] = useState("");
  const searchTimeoutRef = useRef(null);

  const clearFilters = useCallback(() => {
    setFilters((prev) => {
      const newFilters = [...prev];
      newFilters[0] = "";
      return newFilters;
    });
    setSearchValue("");
  }, [setFilters]);

  // Função otimizada de handleFilterSearch
  const handleFilterSearch = useCallback(
    (e) => {
      const value = e.target.value;
      setSearchValue(value);

      // Limpa o timeout anterior se existir
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      if (!value.trim()) {
        clearFilters();
        return;
      }

      if (value.length < 3) {
        return;
      }

      searchTimeoutRef.current = setTimeout(() => {
        setFilters((prev) => {
          const newFilters = [...prev];
          newFilters[0] = `&projectName=${value}`;
          return newFilters;
        });
      }, 3000);
    },
    [clearFilters]
  );

  // Handler para eventos de teclado
  const handleKeyDown = useCallback(
    (e) => {
      // Limpa o timeout existente
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      if (e.key === "Enter" && searchValue.length >= 3) {
        setFilters((prev) => {
          const newFilters = [...prev];
          newFilters[0] = `&projectName=${searchValue}`;
          return newFilters;
        });
      }

      if (e.key === "Escape") {
        clearFilters();
      }
    },
    [searchValue, clearFilters]
  );

  // Cleanup effect para limpar o timeout quando o componente for desmontado
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  //Filtro de data de criação
  const handleFilterDateCreation = (value) => {
    if (!value) {
      setFilters((prev) => {
        const newFilters = [...prev];
        newFilters[1] = "";
        return newFilters;
      });
      return;
    }

    setFilters((prev) => {
      const newFilters = [...prev];
      newFilters[1] =
        value === "Criados recentemente"
          ? "&orderBy=createdAt&orderDirection=DESC"
          : "&orderBy=createdAt&orderDirection=ASC";
      return newFilters;
    });
  };

  //Filtro de data de recente
  const handleFilterRecentDate = (value) => {
    if (!value) {
      setFilters((prev) => {
        const newFilters = [...prev];
        newFilters[1] = "";
        return newFilters;
      });
      return;
    }

    setFilters((prev) => {
      const newFilters = [...prev];
      newFilters[1] =
        value === "Vistos recentemente"
          ? "&orderBy=updatedAt&orderDirection=DESC"
          : "&orderBy=updatedAt&orderDirection=ASC";
      return newFilters;
    });
  };

  // paginação
  const paginationSize = [5, 10, 25, 50];
  const [limit, setLimit] = useState(pagination.pagination.limit);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.floor(pagination.count / limit) || 1;

  // Handler para alteração do número de itens por página
  const handleLimitChange = (updateLimit) => {
    setLimit(updateLimit);
    setCurrentPage(1);
    setPagination((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        limit: updateLimit,
      },
    }));
  };

  // Handler para troca de página, para atualizar o offset
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setPagination((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        offset: page * limit,
      },
    }));
  };

  //FEAT Filtras
  const pagedData = projects;

  return (
    <div className={styles.viewProject__container}>
      <header>
        <span title="voltar">
          <Text.Root>
            <Text.Headline
              style={{ color: "var(--gray-900)" }}
              text={"Projeto"}
              as="h6"
            />
          </Text.Root>
        </span>
        <Input.Root
          style={{ width: "30%" }}
          placeholder="Pesquisar projeto"
          type="search"
          value={searchValue}
          onChange={handleFilterSearch}
          onKeyDown={handleKeyDown}
        />
      </header>
      <div className={styles.viewProject__content}>
        <div className={styles.viewProject__filter}>
          <form>
            <Dropdown.Root default={true}>
              <Dropdown.Trigger title="Todos" />
            </Dropdown.Root>
            <Dropdown.Root onSelect={handleFilterRecentDate}>
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
            <Dropdown.Root onSelect={handleFilterDateCreation}>
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pagedData.length <= 0 ? (
                <tr>
                  <td colSpan={6}>
                    Ainda não há projetos cadastrados. Criar meu primeiro
                    projeto agora.
                  </td>
                </tr>
              ) : null}
              {pagedData.map((item) => (
                <tr key={item.id}>
                  <td>{item.projectName}</td>
                  <td>
                    <div className={styles.table__users}>
                      <IconChoice icon="develop" />
                      <span>{item.creatorFullName}</span>
                    </div>
                  </td>
                  <td>
                    <span>{item.createdAt}</span>
                  </td>
                  <td>
                    <div className={styles.table__status}>
                      <Text.Root>
                        <Text.Button
                          data-type="small"
                          style={{ color: "var(--tertiary-800)" }}
                          text={item.status}
                        />
                      </Text.Root>
                    </div>
                  </td>
                  <td>
                    <div className={styles.table__buttons}>
                      <span title="Ver detalhes">
                        <Link to={`/DetailProject/${item.id}`}>
                          <IconChoice icon="eyeOn" />
                        </Link>
                      </span>
                      <span title="Favoritar">
                        <IconChoice icon="star" />
                      </span>
                      <span title="Editar">
                        <Link to={`/editProject/${item.id}`}>
                          <IconChoice icon="edit" />
                        </Link>
                      </span>
                      <span
                        title="Deletar"
                        onClick={() => handleOpenAlertDelete(item.id)}
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
        <Pagination.Root>
          <Pagination.Selector
            currentLimit={limit}
            onLimitChange={handleLimitChange}
            limitOptions={paginationSize}
          />
          <Pagination.Numbers
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Pagination.Root>
      </div>
    </div>
  );
}
