import { Button } from "../../components/Button";
import { Input } from "../../components/Input/indes";
import { IconChoice } from "../../utils/IconChoice";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";
import { InputCombobox } from "../../components/InputCombobox";
import RegisterBrainstormingService from "./registerBrainstorming.service";
import { URL as baseURL } from "../../utils/base";
import { FeedbackAlert } from "../../components/FeedbackAlert";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../hooks/useAlert";

export function RegisterBrainstorming() {
  const navigate = useNavigate();
  const { close } = useAlert();
  const [brainstormingId, setBrainstormingId] = useState(null);

  // ✅ Schema
  const schema = Yup.object().shape({
    title: Yup.string()
      .required("Título do Brainstorming é obrigatório!")
      .matches(/^[A-Za-z0-9 ]+$/, "Use apenas letras e números"),
    date: Yup.string().required("Data é obrigatória!"),
    hours: Yup.string().required("Horário é obrigatório!"),
    project: Yup.string()
      .transform((value, originalValue) =>
        typeof originalValue === "object" ? originalValue.label : value
      )
      .required("Projeto é obrigatório!"),
    userStory: Yup.string()
      .transform((value, originalValue) =>
        Array.isArray(originalValue)
          ? originalValue.map((i) => i.label).join(", ")
          : value
      )
      .required("História de Usuário é obrigatória!"),
  });

  // ✅ Service CORRETO (sem config)
  const {
    listProjects,
    listUserStoriesByProject,
    setProjectId,
    handleBackButton,
    RegisterBrainstorming,
  } = RegisterBrainstormingService(baseURL);

  const {
    register,
    control,
    handleSubmit,
    getValues,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const selectedProject = watch("project");

  // ✅ Atualiza projectId
  useEffect(() => {
    if (selectedProject?.value) {
      setProjectId(selectedProject.value);
    } else {
      setProjectId(null);
    }
  }, [selectedProject, setProjectId]);

  // ✅ Submit correto
  const handleSubmitForm = async () => {
    const body = getValues();

    try {
      const id = await RegisterBrainstorming(body);
      setBrainstormingId(id);
      openSuccessAlert(id);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Alerts
  const openSuccessAlert = (id) => {
    close(
      <FeedbackAlert.Root>
        <FeedbackAlert.Icon icon="checkcircle" />
        <FeedbackAlert.Title title="Brainstorming criado!" />
        <FeedbackAlert.Description description="Deseja seguir para as cartas?" />
        <FeedbackAlert.Button
          label="Ir para as cartas"
          onClick={() => {
            close(null);
            navigate(`/brainstorming/${id}/cards`);
          }}
        />
      </FeedbackAlert.Root>
    );
  };

  return (
    <div className={styles.brainstorming__container}>
      <header>
        <span title="voltar">
          <IconChoice
            icon="back"
            onClick={() => handleBackButton(watch(), null)}
          />
          <h4>Novo Brainstorming</h4>
        </span>
      </header>

      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className={styles.generaldata__container}>
          <h4>Dados gerais</h4>

          <div className={styles.generaldata__input}>
            <fieldset>
              <h6>Título</h6>
              <Input.Root {...register("title")} id="title">
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
                  placeholder="Selecione o projeto"
                  control={control}
                  options={listProjects}
                  error={errors.project}
                />
                {errors.project && (
                  <InputCombobox.Error>
                    {errors.project.message}
                  </InputCombobox.Error>
                )}
              </InputCombobox.Root>
            </fieldset>

            <fieldset>
              <h6>Data</h6>
              <Input.Root type="date" {...register("date")}>
                {errors.date && (
                  <Input.Error>{errors.date.message}</Input.Error>
                )}
              </Input.Root>
            </fieldset>

            <fieldset>
              <h6>Horário</h6>
              <Input.Root type="time" {...register("hours")}>
                {errors.hours && (
                  <Input.Error>{errors.hours.message}</Input.Error>
                )}
              </Input.Root>
            </fieldset>
          </div>
        </div>

        <div className={styles.selectUserStory__container}>
          <h4>Histórias de Usuário</h4>
          <InputCombobox.Root>
            <InputCombobox.MultiSelect
              name="userStory"
              placeholder="Selecione a história"
              control={control}
              options={listUserStoriesByProject}
              error={errors.userStory}
            />
            {errors.userStory && (
              <InputCombobox.Error>
                {errors.userStory.message}
              </InputCombobox.Error>
            )}
          </InputCombobox.Root>
        </div>

        <div className={styles.buttons__container}>
          <Button.Root
            type="button"
            data-type="secondary"
            onClick={() => handleBackButton(watch(), null)}
          >
            <Button.Text>Cancelar</Button.Text>
          </Button.Root>

          <Button.Root
            type="submit"
            data-type="primary"
            disabled={!isValid}
          >
            <Button.Text>Agendar Brainstorming</Button.Text>
          </Button.Root>
        </div>
      </form>
    </div>
  );
}
