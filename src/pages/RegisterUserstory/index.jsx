import { Button } from "../../components/Button";
import { Input } from "../../components/Input/indes";
import { IconChoice } from "../../utils/IconChoice";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./styles.module.scss";
import { useFieldArray, useForm } from "react-hook-form";
import { FeedbackAlert } from "../../components/FeedbackAlert";
import { useAlert } from "../../hooks/useAlert";
import { useNavigate } from "react-router-dom";
import { TooltipInfo } from "../../components/TooltipInfo";
import { InputTextarea } from "../../components/InputTextarea/indes";
import {
  templateCard,
  templateConfirmation,
  templateConversation,
} from "../../utils/templateText";
import { Expansible } from "../../components/Expansible/indes";

export function RegisterUserstory() {
  const schema = Yup.object().shape({
    userStory: Yup.array()
      .of(
        Yup.object().shape({
          userstoryNumber: Yup.string().required(
            "Número da História de Usuário é um campo obrigatório!"
          ),
          card: Yup.string().required("Cartão é um campo obrigatório!"),
          conversation: Yup.string().required(
            "Conversa é um campo obrigatório!"
          ),
          confirmation: Yup.string().required(
            "Confirmação é um campo obrigatório!"
          ),
        })
      )
      .test(
        "is-valid",
        "Histórias de Usuário são obrigatórias!",
        function (value) {
          if (!value) return false;
          // Verifique todos os itens, exceto o último
          for (let i = 0; i < value.length - 1; i++) {
            const item = value[i];
            if (
              !item.userstoryNumber ||
              !item.card ||
              !item.conversation ||
              !item.confirmation
            ) {
              return false;
            }
          }
          // O último item é opcional, independentemente de estar preenchido ou não
          return true;
        }
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
      userStory: [
        { userstoryNumber: "", card: "", conversation: "", confirmation: "" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "userStory",
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
    <div className={styles.registerUserstory__container}>
      <header>
        <span title="voltar">
          <IconChoice onClick={() => handleBackButton()} icon="back" />
          <h4>Criar Histórias de Usuário</h4>
        </span>
      </header>

      <form onSubmit={handleSubmit(handleSubmitForm)}>
        {fields.map((item, index) => {
          const isLast = index === fields.length - 1;
          const FieldSetContent = (
            <>
              <fieldset>
                <h6>Número da História de Usuário</h6>
                <Input.Root
                  type="text"
                  {...register(`userStory[${index}].userstoryNumber`)}
                  name={`userStory[${index}].userstoryNumber`}
                  id={`userStory[${index}].userstoryNumber`}
                >
                  {errors.userStory?.[index]?.userstoryNumber && (
                    <Input.Error>
                      {errors.userStory[index].userstoryNumber.message}
                    </Input.Error>
                  )}
                </Input.Root>
              </fieldset>
              <fieldset>
                <TooltipInfo.Root
                  text="Copia Template"
                  onClick={() =>
                    setValue(`userStory[${index}].card`, templateCard)
                  }
                >
                  <h6>Cartão</h6>
                </TooltipInfo.Root>
                <InputTextarea.Root
                  name={`userStory[${index}].card`}
                  id={`userStory[${index}].card`}
                  control={control}
                >
                  {errors.userStory?.[index]?.card && (
                    <InputTextarea.Error>
                      {errors.userStory[index].card.message}
                    </InputTextarea.Error>
                  )}
                </InputTextarea.Root>
              </fieldset>
              <fieldset>
                <TooltipInfo.Root
                  text="Copia Template"
                  onClick={() =>
                    setValue(
                      `userStory[${index}].conversation`,
                      templateConversation
                    )
                  }
                >
                  <h6>Conversa</h6>
                </TooltipInfo.Root>
                <InputTextarea.Root
                  name={`userStory[${index}].conversation`}
                  id={`userStory[${index}].conversation`}
                  control={control}
                >
                  {errors.userStory?.[index]?.conversation && (
                    <InputTextarea.Error>
                      {errors.userStory[index].conversation.message}
                    </InputTextarea.Error>
                  )}
                </InputTextarea.Root>
              </fieldset>
              <fieldset>
                <TooltipInfo.Root
                  text="Copia Template"
                  onClick={() =>
                    setValue(
                      `userStory[${index}].confirmation`,
                      templateConfirmation
                    )
                  }
                >
                  <h6>Confirmação</h6>
                </TooltipInfo.Root>
                <InputTextarea.Root
                  name={`userStory[${index}].confirmation`}
                  id={`userStory[${index}].confirmation`}
                  control={control}
                >
                  {errors.userStory?.[index]?.confirmation && (
                    <InputTextarea.Error>
                      {errors.userStory[index].confirmation.message}
                    </InputTextarea.Error>
                  )}
                </InputTextarea.Root>
              </fieldset>
            </>
          );

          return isLast ? (
            <div className={styles.generaldata__container} key={item.id}>
              {FieldSetContent}
            </div>
          ) : (
            <Expansible.Root
              usNumber={index + 1}
              key={item.id}
              close={() => remove(index)}
            >
              <div className={styles.generaldata__container}>
                {FieldSetContent}
              </div>
            </Expansible.Root>
          );
        })}

        <div className={styles.buttons__container}>
          <Button.Root
            disabled={!isValid}
            data-type="primary"
            onClick={() =>
              append({
                userstoryNumber: "",
                card: "",
                conversation: "",
                confirmation: "",
              })
            }
          >
            <Button.Text>Nova História de Usuário</Button.Text>
            <Button.Icon iconName="plus" />
          </Button.Root>
          <div>
            <Button.Root data-type="secondary">
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
