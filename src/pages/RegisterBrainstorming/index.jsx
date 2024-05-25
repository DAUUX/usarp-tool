import { Button } from "../../components/Button";
import { Input } from "../../components/Input/indes";
import { IconChoice } from "../../utils/IconChoice";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";
import { InputCombobox } from "../../components/InputCombobox";
import { FeedbackAlert } from "../../components/FeedbackAlert";
import { useAlert } from "../../hooks/useAlert";
import { useNavigate } from "react-router-dom";

export function RegisterBrainstorming() {
  const schema = Yup.object().shape({
    title: Yup.string().required(
      "Título do Brainstorming e um campo obrigatório!"
    ),
    date: Yup.string().required("Data e um campo obrigatório!"),
    hours: Yup.string().required("Horário e um campo obrigatório!"),
    project: Yup.string()
      .transform((value, originalValue) => {
        if (originalValue && typeof originalValue === "object") {
          return originalValue.label;
        }
        return value;
      })
      .required("Projeto é um campo obrigatório!"),
    userStory: Yup.string()
      .transform((value, originalValue) => {
        if (Array.isArray(originalValue)) {
          return originalValue.map((item) => item.label).join(", ");
        }
        return value;
      })
      .required("Histórias de Usuário é um campo obrigatório!"),
  });
  const { open, close } = useAlert();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
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
    <div className={styles.brainstorming__container}>
      <header>
        <span title="voltar">
          <IconChoice onClick={() => handleBackButton()} icon="back" />
          <h4>Novo Brainstorming</h4>
        </span>
      </header>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className={styles.generaldata__container}>
          <h4>Dados gerais</h4>
          <div className={styles.generaldata__input}>
            <fieldset>
              <h6>Título do Brainstorming</h6>
              <Input.Root
                {...register("title")}
                type="text"
                name="title"
                id="title"
                required={errors.title ? true : false}
              >
                {errors.title && (
                  <Input.Error>{errors.title.message}</Input.Error>
                )}
              </Input.Root>
            </fieldset>
            <fieldset>
              <h6>Projeto</h6>
              <InputCombobox.Root>
                <InputCombobox.Select
                  name="project"
                  error={errors.project}
                  control={control}
                  required={errors.project ? true : false}
                  options={[
                    { value: "1", label: "USARP Tool" },
                    { value: "2", label: "MDV" },
                    { value: "3", label: "Projeto 1" },
                  ]}
                />
                {errors.project && (
                  <InputCombobox.Error>
                    {errors.project.message}
                  </InputCombobox.Error>
                )}
              </InputCombobox.Root>
            </fieldset>
            <fieldset>
              <h6>Data do Brainstorming</h6>
              <Input.Root
                {...register("date")}
                name="date"
                id="date"
                type="date"
                required={errors.date ? true : false}
              >
                {errors.date && (
                  <Input.Error>{errors.date.message}</Input.Error>
                )}
              </Input.Root>
            </fieldset>
            <fieldset>
              <h6>Horário</h6>
              <Input.Root
                {...register("hours")}
                name="hours"
                id="hours"
                type="time"
                required={errors.hours ? true : false}
              >
                {errors.hours && (
                  <Input.Error>{errors.hours.message}</Input.Error>
                )}
              </Input.Root>
            </fieldset>
          </div>
        </div>
        <div className={styles.selectUserStory__container}>
          <h4>Histórias de Usuário do Brainstorming</h4>
          <div>
            <fieldset>
              <InputCombobox.Root>
                <InputCombobox.MultiSelect
                  name="userStory"
                  defaultValue={[]}
                  error={errors.userStory}
                  control={control}
                  required={errors.userStory ? true : false}
                  options={[
                    { value: "1", label: "USARP Tool" },
                    { value: "2", label: "MDV" },
                    { value: "3", label: "Projeto 1" },
                  ]}
                />
                {errors.userStory && (
                  <InputCombobox.Error>
                    {errors.userStory.message}
                  </InputCombobox.Error>
                )}
              </InputCombobox.Root>
            </fieldset>
          </div>
        </div>
        <div className={styles.buttons__container}>
          <Button.Root disabled={!isValid} data-type="primary" type="submit">
            <Button.Text>Agendar Brainstorming</Button.Text>
          </Button.Root>
        </div>
      </form>
    </div>
  );
}
