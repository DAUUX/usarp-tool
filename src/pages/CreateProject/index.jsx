import { useMemo, useState, useEffect } from "react";
import { MoveLeft, Plus, Trash2 } from "lucide-react";
import { NavLink, useNavigate, useParams } from "react-router-dom"; // Adicionado useParams
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
import styles from "./styles.module.scss";

// Lista de status possíveis para edição
const PROJECT_STATUS_OPTIONS = [
  { value: "Novo", label: "Novo" },
  { value: "active", label: "Ativo" },
  { value: "inactive", label: "Inativo" },
  { value: "completed", label: "Concluído" },
];

const CreateProject = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Pega o ID da rota (se existir)
  const { token } = useAuth();

  const isEditMode = !!id; // Boolean: true se estiver editando

  const [apiError, setApiError] = useState("");
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Schema adaptável
  const schema = useMemo(
    () =>
      Yup.object().shape({
        projectName: Yup.string().required("Nome do Projeto é Obrigatório"),
        description: Yup.string().optional(),
        // Status é obrigatório apenas na edição
        status: isEditMode ? Yup.string().required("Status é obrigatório") : Yup.string().optional(),

        // Na edição, o time não é enviado, mas o form precisa dele para renderizar a lista
        projectTeam: Yup.array().of(
          Yup.object().shape({
            email: Yup.string().email("Digite um Email Valido").required("Email é Obrigatório"),
            roleInProject: Yup.string().required("O Nivel de Acesso é Obrigatório"),
          })
        ),
      }),
    [isEditMode]
  );

  const { control, formState, handleSubmit, reset, setValue } = useForm({
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

  // Efeito para carregar dados se for edição
  useEffect(() => {
    if (isEditMode && token) {
      const fetchProjectData = async () => {
        setIsLoadingData(true);
        try {
          // Reutilizando o endpoint de listagem filtrando por ID para pegar os dados
          const response = await axios.get(`${config.baseUrl}/project/owned-projects`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { id: id }, // Filtra pelo ID
          });

          const projects = response.data.projects || [];
          if (projects.length > 0) {
            const project = projects[0];

            // Preenche o formulário
            reset({
              projectName: project.projectName,
              description: project.description,
              status: project.status,
              // Mapeia o time vindo do back para o formato do form
              projectTeam: project.projectTeam.map((member) => ({
                email: member.email,
                roleInProject: member.roleInProject || "",
              })),
            });
          } else {
            setApiError("Projeto não encontrado ou você não tem permissão.");
          }
        } catch (error) {
          console.error("Erro ao buscar dados do projeto", error);
          setApiError("Erro ao carregar dados do projeto.");
        } finally {
          setIsLoadingData(false);
        }
      };

      fetchProjectData();
    }
  }, [isEditMode, id, token, reset]);

  const handleSubmitForm = async (data) => {
    setApiError("");

    try {
      if (isEditMode) {
        // LÓGICA DE UPDATE (PUT)
        // Payload específico para o PUT (sem projectTeam)
        const updatePayload = {
          projectName: data.projectName,
          description: data.description,
          status: data.status,
        };

        await axios.put(`${config.baseUrl}/project/${id}`, updatePayload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // LÓGICA DE CREATE (POST)
        // Payload completo
        await axios.post(`${config.baseUrl}/project/create`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      reset();
      navigate("/projects");
    } catch (error) {
      console.error("Erro ao salvar projeto:", error);

      if (error.response) {
        const { status, data } = error.response;

        if (status === 400) {
          setApiError(data.message || "Erro de validação.");
        } else if (status === 401) {
          setApiError("Sessão expirada. Faça login novamente.");
        } else if (status === 403) {
          setApiError("Somente o criador pode editar este projeto.");
        } else if (status === 404) {
          setApiError("Projeto não encontrado.");
        } else {
          setApiError("Ocorreu um erro interno.");
        }
      } else {
        setApiError("Erro de conexão com o servidor.");
      }
    }
  };

  if (isLoadingData) {
    return (
      <div className={styles.container}>
        <p>Carregando dados do projeto...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div>
        <NavLink to="/projects" className={styles.header}>
          <MoveLeft />
          <h2>{isEditMode ? "Editar Projeto" : "Novo Projeto"}</h2>
        </NavLink>
      </div>

      {apiError && (
        <div
          style={{
            padding: "1rem",
            marginBottom: "1rem",
            backgroundColor: "#fee2e2",
            color: "#b91c1c",
            borderRadius: "8px",
          }}
        >
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
                <Input
                  {...field}
                  label="Nome do Projeto"
                  placeholder="Digite o Nome do Seu Projeto"
                  required
                  error={!!errors.projectName}
                  helperText={errors.projectName?.message}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Descrição do Projeto (Opcional)"
                  placeholder="Pequena descrição do projeto"
                  multiline={true}
                  rows={3}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />

            {/* Campo STATUS só aparece na Edição */}
            {isEditMode && (
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Status do Projeto"
                    options={PROJECT_STATUS_OPTIONS}
                    required
                    error={!!errors.status}
                    helperText={errors.status?.message}
                    placeholder="Selecione o status"
                  />
                )}
              />
            )}
          </div>
        </fieldset>

        {/* Na edição, mostraremos a equipe como "apenas leitura" ou editável visualmente,
            mas lembrando que a API de PUT não atualiza a equipe.
            Para evitar confusão, vamos desabilitar a edição da equipe se for EditMode
            ou adicionar um aviso visual.
        */}
        <fieldset>
          <legend>
            Equipe do projeto{" "}
            {isEditMode && (
              <span style={{ fontSize: "0.8rem", color: "#666" }}>
                (Gerenciamento de equipe indisponível na edição rápida)
              </span>
            )}
          </legend>

          {fields.map((field, index) => (
            <div key={field.id} className={styles.members} style={{ marginBottom: "1rem" }}>
              <Controller
                name={`projectTeam.${index}.email`}
                control={control}
                render={({ field: inputField }) => (
                  <Input
                    {...inputField}
                    label="E-mail do membro"
                    disabled={isEditMode} // Desabilita na edição
                    type="email"
                    placeholder="Digite o email"
                    error={!!errors.projectTeam?.[index]?.email}
                    helperText={errors.projectTeam?.[index]?.email?.message}
                    required={!isEditMode}
                  />
                )}
              />

              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", width: "100%" }}>
                <div style={{ flex: 1 }}>
                  <Controller
                    name={`projectTeam.${index}.roleInProject`}
                    control={control}
                    render={({ field: inputField }) => (
                      <Select
                        {...inputField}
                        label="Papel"
                        disabled={isEditMode} // Desabilita na edição
                        error={!!errors.projectTeam?.[index]?.roleInProject}
                        helperText={errors.projectTeam?.[index]?.roleInProject?.message}
                        options={ROLE_IN_PROJECT}
                        required={!isEditMode}
                        placeholder="Nível"
                      />
                    )}
                  />
                </div>

                {/* Botão de remover só aparece se NÃO for edição e tiver mais de 1 */}
                {!isEditMode && fields.length > 0 && (
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={() => remove(index)}
                    style={{ marginTop: "32px", padding: "10px" }}
                  >
                    <Trash2 size={20} />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </fieldset>

        <div className={styles.buttonGroup}>
          {/* Botão Novo Membro oculto na edição */}
          {!isEditMode && (
            <Button
              type="button"
              icon={<Plus />}
              iconPosition="end"
              onClick={() => append({ email: "", roleInProject: "" })}
            >
              Novo Membro
            </Button>
          )}

          <div>
            <Button
              type="reset"
              variant="outlined"
              onClick={() => {
                reset();
                navigate("/projects");
              }}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? "Salvando..." : isEditMode ? "Salvar Alterações" : "Cadastrar"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
