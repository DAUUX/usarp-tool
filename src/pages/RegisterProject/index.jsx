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
import { useNavigate } from "react-router-dom";
import { InputTextarea } from "../../components/InputTextarea/indes";


export function RegisterProject() {
  const schema = Yup.object().shape({
    name: Yup.string().required("Nome do projeto é obrigatório"),
    description: Yup.string().required("Descrição é obrigatória"),
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
          .required("Função é obrigatória"),
      })
    ),
  });

  const { open, close } = useAlert();
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      members: [{ email: "", role: "" }],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "members",
  });

  const goBack = () => {
    close();
    navigate(-1);
  };
  const contentSuccess = (
    <FeedbackAlert.Root>
      <FeedbackAlert.Icon icon="checkcircle" />
      <FeedbackAlert.Title title="Excelente" />
      <FeedbackAlert.Description
        style={{ textAlign: "center" }}
        description="Novo Brainstorming registrado!"
      />
      <FeedbackAlert.Button onClick={close} label="Visualizar" />
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
    const formValue = watch(["date", "hours", "project", "title", "userStory"]);
    const hasDataLoss = formValue.some((item) => {
      if (Array.isArray(item)) {
        return item.length > 0;
      } else {
        return Boolean(item);
      }
    });

    hasDataLoss ? handleOpenAlert(contentWarning) : goBack();
  };
  const handleSubmitForm = (body) => {
    handleOpenAlert(contentSuccess);
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
              <h6>Descrição</h6>
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
                <h6>Função dentro do projeto</h6>
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
            data-type="primary"
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
            <Button.Root data-type="secondary" type="button">
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
