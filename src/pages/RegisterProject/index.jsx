import { Button } from "../../components/Button";
import { Input } from "../../components/Input/indes";
import { IconChoice } from "../../utils/IconChoice";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./styles.module.scss";
import { useFieldArray, useForm } from "react-hook-form";
import { InputCombobox } from "../../components/InputCombobox";
import { FeedbackAlert } from "../../components/FeedbackAlert";
import { useNavigate, useParams } from "react-router-dom";
import { InputTextarea } from "../../components/InputTextarea/indes";
import RegisterProjectService from "./registerProject.service";
import { useEffect } from "react";

export function RegisterProject() {
  const { id } = useParams();
  const {
    handleBackButton,
    registerProject,
    handleBackBackCloseALert,
    close,
    getProjectByid,
    updateProject,
  } = RegisterProjectService("");
  const schema = Yup.object().shape({
    projectName: Yup.string()
      .required("Nome do projeto é obrigatório")
      .min(5, "Nome do projeto deve ter no mínimo 5 caracteres"),
    description: Yup.string(),
    projectTeam: Yup.array().of(
      Yup.object().shape({
        email: Yup.string()
          .email("E-mail inválido")
          .required("E-mail é obrigatório"),
        roleInProject: Yup.string()
          .transform((value, originalValue) => {
            if (originalValue && typeof originalValue === "object") {
              return originalValue.label;
            }
            return value;
          })
          .required("Papel é obrigatório"),
      })
    ),
  });
  const navigate = useNavigate();
  const initialValues = {
    projectName: "",
    description: "",
    projectTeam: [{ email: "", roleInProject: "" }],
  };
  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projectTeam",
  });

  const navegate = () => {
    close();
    navigate("/registerUserstory");
  };

  const extractValueSimpleQuotes = (texto) => {
    const regex = /'([^']*)'/;
    const resultado = regex.exec(texto);
    return resultado ? resultado[1] : null;
  };
  
  const contentSuccess = (
    <FeedbackAlert.Root>
      <FeedbackAlert.Icon icon="checkcircle" />
      <FeedbackAlert.Title title="Excelente" />
      <FeedbackAlert.Description
        style={{ textAlign: "center" }}
        description="Projeto teste cadastrado com sucesso!"
      />
      <div className={styles.alert__buttons}>
        <Button.Root
          data-type="secondary"
          onClick={() => handleBackBackCloseALert()}
        >
          <Button.Text>Ok, fechar</Button.Text>
        </Button.Root>
        <Button.Root data-type="primary" onClick={() => navegate()}>
          <Button.Text>Cadastrar Histórias de Usuário!</Button.Text>
        </Button.Root>
      </div>
    </FeedbackAlert.Root>
  );
  const contentUpdate = (
    <FeedbackAlert.Root>
      <FeedbackAlert.Icon icon="checkcircle" />
      <FeedbackAlert.Title title="Excelente!" />
      <FeedbackAlert.Description
        style={{ textAlign: "center", color: "var(--gray-700)" }}
        description="<span>Perfil Atualizado com sucesso!</span>
        <p> Você será redirecionado para página de projetos.</p>"
      ></FeedbackAlert.Description>
    </FeedbackAlert.Root>
  );

  const contentWarning = (
    <FeedbackAlert.Root>
      <FeedbackAlert.Icon icon="warningcircle" />
      <FeedbackAlert.Title title="Aviso!" />
      <FeedbackAlert.Description description="Ao sair da pagina as informações serão perdidas, deseja continuar?" />
      <div className={styles.alert__buttons}>
        <Button.Root data-type="danger" onClick={() => close()}>
          <Button.Text>Cancelar</Button.Text>
        </Button.Root>
        <Button.Root
          data-type="primary"
          onClick={() => handleBackBackCloseALert()}
        >
          <Button.Text>Sim, continuar</Button.Text>
        </Button.Root>
      </div>
    </FeedbackAlert.Root>
  );

  const contentWarningEmail = (
    <FeedbackAlert.Root>
      <FeedbackAlert.Icon icon="warningcircle" />
      <FeedbackAlert.Title title="Aviso!" />
      <FeedbackAlert.Description
        style={{ textAlign: "center" }}
        description={`Usuário com email ${extractValueSimpleQuotes()} não encontrado.`}
      />
      <div className={styles.alert__buttons}>
        <Button.Root
          data-type="primary"
          onClick={() => handleBackBackCloseALert()}
        >
          <Button.Text>Ok, fechar</Button.Text>
        </Button.Root>
      </div>
    </FeedbackAlert.Root>
  );

  const contentError = (
    <FeedbackAlert.Root>
      <FeedbackAlert.Icon icon="closecircle" />
      <FeedbackAlert.Title title="Erro ao realizar Cadastro!" />
      <FeedbackAlert.Description
        style={{ textAlign: "center" }}
        description={`Falha na conexão`}
      />
      <div className={styles.alert__buttons}>
        <Button.Root
          data-type="primary"
          onClick={() => handleBackBackCloseALert()}
        >
          <Button.Text>Ok, fechar</Button.Text>
        </Button.Root>
      </div>
    </FeedbackAlert.Root>
  );

  const handleSubmitForm = (body) => {
    if (id) {
      updateProject(id, body, contentUpdate, contentError, contentWarningEmail);
      return;
    }
    registerProject(body, contentSuccess, contentError, contentWarningEmail);
  };

  // para editar um projeto existente
  useEffect(() => {
    
    const fetchProject = async () => {
      if (id) {
        const projectById = await getProjectByid(id);
        console.log("Project data fetched:", projectById);
        reset(projectById);
      }
    };
    fetchProject();
  }, [id, reset]);


  return (
    <div className={styles.registerProject__container}>
      <header>
        <span title="voltar">
          <IconChoice
            onClick={() => handleBackButton(watch(), contentWarning)}
            icon="back"
          />
          <h4>Novo projeto</h4>
        </span>
      </header>

      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className={styles.generaldata__container}>
          <h4>Dados gerais</h4>
          <div className={styles.geraldata__content}>
            <fieldset>
              <h6>Nome do projeto</h6>
              <Input.Root
                type="text"
                {...register("projectName")}
                name={"projectName"}
                id={"projectName"}
              >
                {errors.projectName && (
                  <Input.Error>{errors.projectName.message}</Input.Error>
                )}
              </Input.Root>
            </fieldset>
            <fieldset>
              <h6>Descrição (Opcional)</h6>
              <InputTextarea.Root
                name={"description"}
                id={"description"}
                control={control}
              >
                {errors.description && (
                  <InputTextarea.Error>
                    {errors.description.message}
                  </InputTextarea.Error>
                )}
              </InputTextarea.Root>
            </fieldset>
          </div>
        </div>
        <div className={styles.selectUserStory__container}>
          <h4>Equipe do projeto</h4>
          {fields.map((item, index) => (
            <div className={styles.selectuserstory__content} key={item.id}>
              <fieldset>
                <h6>E-mail do membro</h6>
                <Input.Root
                  type="text"
                  {...register(`projectTeam.${index}.email`)}
                  name={`projectTeam.${index}.email`}
                  id={`projectTeam.${index}.email`}
                >
                  {errors.projectTeam?.[index]?.email && (
                    <Input.Error>
                      {errors.projectTeam[index].email.message}
                    </Input.Error>
                  )}
                </Input.Root>
              </fieldset>
              <fieldset>
                <h6>Papel dentro do projeto</h6>
                <InputCombobox.Root>
                  <InputCombobox.Select
                    style={{ width: "100%" }}
                    placeholder="Selecionar"
                    name={`projectTeam.${index}.roleInProject`}
                    error={errors.projectTeam?.[index]?.roleInProject}
                    control={control}
                    required={!!errors.projectTeam?.[index]?.roleInProject}
                    options={[
                      { value: "Moderador", label: "Moderador" },
                      { value: "Participante", label: "Participante" },
                    ]}
                  />
                  {errors.projectTeam?.[index]?.roleInProject && (
                    <InputCombobox.Error>
                      {errors.projectTeam[index].roleInProject.message}
                    </InputCombobox.Error>
                  )}
                </InputCombobox.Root>
              </fieldset>
              {index > 0 && (
                <div className={styles.delete__button} title="deletar membro">
                  <IconChoice icon="delete" onClick={() => remove(index)} />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={styles.buttons__container}>
          <Button.Root
            type="button"
            disabled={!isValid}
            data-type="tertiary"
            onClick={() => append({ email: "", roleInProject: "" })}
          >
            <Button.Text>Novo membro</Button.Text>
            <Button.Icon iconName="plus" />
          </Button.Root>
          <div>
            <Button.Root
              data-type="secondary"
              type="button"
              onClick={() => handleBackButton(watch(), contentWarning)}
            >
              <Button.Text>Cancelar</Button.Text>
            </Button.Root>
            <Button.Root disabled={!isValid} data-type="primary" type="submit">
              <Button.Text>{!id ? "Cadastrar":"Atualizar" }</Button.Text>
            </Button.Root>
          </div>
        </div>
      </form>
    </div>
  );
}
