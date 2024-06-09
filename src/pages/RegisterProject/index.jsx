import { Button } from "../../components/Button";
import { Input } from "../../components/Input/indes";
import { IconChoice } from "../../utils/IconChoice";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./styles.module.scss";
import { useFieldArray, useForm } from "react-hook-form";
import { InputCombobox } from "../../components/InputCombobox";
import { FeedbackAlert } from "../../components/FeedbackAlert";
import { useAlert } from "../../hooks/useAlert";
import { useNavigate, useParams } from "react-router-dom";
import { InputTextarea } from "../../components/InputTextarea/indes";
import axios from "axios";
import { URL as baseURL } from "../../utils/base";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";

export function RegisterProject() {
  const { id } = useParams();
  const { user } = useAuth();
  const schema = Yup.object().shape({
    name: Yup.string()
      .required("Nome do projeto é obrigatório")
      .min(5, "Nome do projeto deve ter no mínimo 5 caracteres"),
    description: Yup.string(),
    members: Yup.array().of(
      Yup.object().shape({
        email: Yup.string()
          .email("E-mail inválido")
          .required("E-mail é obrigatório"),
        role: Yup.string()
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

  const { open, close } = useAlert();
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    description: "",
    members: [{ email: "", role: "" }],
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

  const { fields, append } = useFieldArray({
    control,
    name: "members",
  });

  const goBack = () => {
    close();
    navigate(-1);
  };

  const navegate = () => {
    close();
    navigate("/project");
  };
  function getCurrentDateFormatted() {
    const today = new Date();

    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
  }
  const contentSuccess = (
    <FeedbackAlert.Root>
      <FeedbackAlert.Icon icon="checkcircle" />
      <FeedbackAlert.Title title="Excelente" />
      <FeedbackAlert.Description
        style={{ textAlign: "center" }}
        description="Novo Projeto registrado!"
      />
      <FeedbackAlert.Button onClick={() => navegate()} label="Visualizar" />
    </FeedbackAlert.Root>
  );
  const contentWarning = (
    <FeedbackAlert.Root>
      <FeedbackAlert.Icon icon="warningcircle" />
      <FeedbackAlert.Title title="Aviso!" />
      <FeedbackAlert.Description description="Ao sair da pagina as informações serão perdidas, deseja continuar?" />
      <div className={styles.alert__buttons}>
        <Button.Root data-type="danger" onClick={close}>
          <Button.Text>Cancelar</Button.Text>
        </Button.Root>
        <Button.Root data-type="primary" onClick={goBack}>
          <Button.Text>Sim, continuar</Button.Text>
        </Button.Root>
      </div>
    </FeedbackAlert.Root>
  );
  const handleOpenAlert = (content) => {
    open(content);
  };
  const handleBackButton = () => {
    const formValues = watch();
    const hasDataLoss = Object.values(formValues).some((value) => {
      if (Array.isArray(value)) {
        return value.some((item) => Object.values(item).some((val) => val));
      }
      return Boolean(value);
    });

    hasDataLoss ? handleOpenAlert(contentWarning) : goBack();
  };
  const handleSubmitForm = (body) => {
    const newData = {
      createdby: {
        role: "Developer",
        name: user.fullName,
      },
      status: "Novo",
      date: getCurrentDateFormatted(),
      amountUs: 0,
      userStoryId: 8,
    };

    const mergedBody = { ...body, ...newData };
    axios
      .post(baseURL + "/projeto", mergedBody)
      .then(() => {
        handleOpenAlert(contentSuccess);
        // handleOpenAlertSuccess();
        // setTimeout(() => {
        //   close();
        // }, 3000);
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          // handleOpenAlertError();
        }
        // handleOpenToastError();
      });
  };

  useEffect(() => {
    if (id) {
      const fetchProject = async () => {
        try {
          const project = await axios.get(`${baseURL}/projeto/${id}`);
          const { name, description, members } = project.data;
          reset({ name, description, members });
        } catch (error) {
          console.error("Erro ao carregar o projeto:", error);
        }
      };
      fetchProject();
    }
  }, [id, reset]);

  return (
    <div className={styles.registerProject__container}>
      <header>
        <span title="voltar">
          <IconChoice onClick={() => handleBackButton()} icon="back" />
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
                {...register("name")}
                name={"name"}
                id={"name"}
              >
                {errors.name && (
                  <Input.Error>{errors.name.message}</Input.Error>
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
                  {...register(`members.${index}.email`)}
                  name={`members.${index}.email`}
                  id={`members.${index}.email`}
                >
                  {errors.members?.[index]?.email && (
                    <Input.Error>
                      {errors.members[index].email.message}
                    </Input.Error>
                  )}
                </Input.Root>
              </fieldset>
              <fieldset>
                <h6>Papel dentro do projeto</h6>
                <InputCombobox.Root>
                  <InputCombobox.Select
                    name={`members.${index}.role`}
                    defaultValue=""
                    error={errors.members?.[index]?.role}
                    control={control}
                    required={!!errors.members?.[index]?.role}
                    options={[
                      { value: "UI/UX", label: "UI/UX" },
                      { value: "Developer", label: "Developer" },
                      { value: "Manager", label: "Manager" },
                    ]}
                  />
                  {errors.members?.[index]?.role && (
                    <InputCombobox.Error>
                      {errors.members[index].role.message}
                    </InputCombobox.Error>
                  )}
                </InputCombobox.Root>
              </fieldset>
            </div>
          ))}
        </div>
        <div className={styles.buttons__container}>
          <Button.Root
            type="button"
            disabled={!isValid}
            data-type="tertiary"
            onClick={() =>
              append({
                members: [{ email: "", role: "" }],
              })
            }
          >
            <Button.Text>Novo membro</Button.Text>
            <Button.Icon iconName="plus" />
          </Button.Root>
          <div>
            <Button.Root
              data-type="secondary"
              type="button"
              onClick={() => handleBackButton()}
            >
              <Button.Text>Cancelar</Button.Text>
            </Button.Root>
            <Button.Root disabled={!isValid} data-type="primary" type="submit">
              <Button.Text>Cadastrar</Button.Text>
            </Button.Root>
          </div>
        </div>
      </form>
    </div>
  );
}
