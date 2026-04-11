import { useMemo, useState, useEffect } from "react";
import { MoveLeft, Plus, Trash2 } from "lucide-react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import Input from "../../components/ui/Input/Input";
import Select from "../../components/ui/Select/Select";
import Button from "../../components/ui/Button/Button";

import { config } from "../../utils/config";
import { useAuth } from "../../hooks/useAuth";

import { ROLE_IN_PROJECT } from "../../data/constants";
import { PROJECT_STATUS } from "../../data/constants";
import styles from "./styles.module.scss";
import Container from "../../layouts/Container/Container";

const CreateProject = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useAuth();

  const isEditMode = !!id;

  const [apiError, setApiError] = useState("");
  const [isLoadingData, setIsLoadingData] = useState(false);

  const schema = useMemo(
    () =>
      Yup.object().shape({
        projectName: Yup.string().required("Nome do Projeto é Obrigatório"),
        description: Yup.string().optional(),
        status: isEditMode
          ? Yup.string().required("Status é obrigatório")
          : Yup.string().optional(),
        projectTeam: Yup.array().of(
          Yup.object().shape({
            email: Yup.string().email("Digite um Email Valido").required("Email é Obrigatório"),
            roleInProject: Yup.string().required("O Nivel de Acesso é Obrigatório"),
          })
        ),
      }),
    [isEditMode]
  );

  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      projectName: "",
      description: "",
      status: "",
      projectTeam: [{ email: "", roleInProject: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projectTeam",
  });

  const { errors, isValid, isSubmitting } = formState;

  useEffect(() => {
    if (!isEditMode || !token) return;

    const fetchProjectData = async () => {
      setIsLoadingData(true);

      try {
        const response = await axios.get(
          `${config.baseUrl}/project/owned-projects`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const project = (response.data.projects || []).find(
          (p) => p.id === id
        );

        if (!project) {
          setApiError("Projeto não encontrado ou você não tem permissão.");
          return;
        }

        reset({
          projectName: project.projectName || "",
          description: project.description || "",
          status: project.status || "",
          projectTeam: project.projectTeam?.length
            ? project.projectTeam
            : [{ email: "", roleInProject: "" }],
        });
      } catch (error) {
        console.error("Erro ao buscar dados do projeto", error);
        setApiError("Erro ao carregar dados do projeto.");
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchProjectData();
  }, [isEditMode, id, token, reset]);

  const handleSubmitForm = async (data) => {
    setApiError("");

    try {
      if (isEditMode) {
        const updatePayload = {
          projectName: data.projectName,
          description: data.description,
          status: data.status,
        };

        await axios.put(`${config.baseUrl}/project/${id}`, updatePayload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        const { status, ...createPayload } = data;

        await axios.post(`${config.baseUrl}/project/create`, createPayload, {
          headers: { Authorization: `Bearer ${token}` },
        });

        window.dispatchEvent(new Event("project-created"));
      }

      reset();
      navigate("/projects");
    } catch (error) {
      console.error("Erro ao salvar projeto:", error);

      setApiError(
        error.response?.data?.message ||
          error.response?.data?.errors?.join(", ") ||
          "Erro de conexão"
      );
    }
  };

  if (isLoadingData) {
    return (
      <Container>
        <p>Carregando dados do projeto...</p>
      </Container>
    );
  }

  return (
    <Container>
      <div>
        <NavLink to="/projects" className={styles.header}>
          <MoveLeft />
          <h2>{isEditMode ? "Editar Projeto" : "Novo Projeto"}</h2>
        </NavLink>
      </div>

      {apiError && (
        <div className={styles.errorBox}>
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit(handleSubmitForm)} noValidate>
        <fieldset>
          <legend>Dados Gerais</legend>

          <div className={styles.project}>
            <Controller
              name="projectName"
              control={control}
              render={({ field }) => (
                <Input {...field} label="Nome do Projeto" />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Input {...field} label="Descrição do Projeto (Opcional)" />
              )}
            />

            {isEditMode && (
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Status do Projeto"
                    options={PROJECT_STATUS}
                  />
                )}
              />
            )}
          </div>
        </fieldset>

        <fieldset>
          <legend>Equipe do projeto</legend>

          {fields.map((field, index) => (
            <div key={field.id} className={styles.members}>
              <Controller
                name={`projectTeam.${index}.email`}
                control={control}
                render={({ field }) => (
                  <Input {...field} label="E-mail do membro" />
                )}
              />

              <Controller
                name={`projectTeam.${index}.roleInProject`}
                control={control}
                render={({ field }) => (
                  <Select {...field} options={ROLE_IN_PROJECT} />
                )}
              />

              {!isEditMode && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                >
                  <Trash2 />
                </button>
              )}
            </div>
          ))}
        </fieldset>

        <Button
          type="button"
          onClick={() =>
            append({ email: "", roleInProject: "" })
          }
        >
          <Plus /> Novo Membro
        </Button>

        <Button type="submit" disabled={!isValid || isSubmitting}>
          {isSubmitting ? "Salvando..." : isEditMode ? "Atualizar" : "Cadastrar"}
        </Button>
      </form>
    </Container>
  );
};

export default CreateProject;