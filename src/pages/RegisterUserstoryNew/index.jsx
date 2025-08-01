import { Button } from "../../components/Button";
import { Input } from "../../components/Input/indes";
import { IconChoice } from "../../utils/IconChoice";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./styles.module.scss";
import { useFieldArray, useForm } from "react-hook-form";
import { TooltipInfo } from "../../components/TooltipInfo";
import { InputTextarea } from "../../components/InputTextarea/indes";
import {templateCard, templateConfirmation, templateConversation,} from "../../utils/templateText";
import { Expansible } from "../../components/Expansible/indes";
import { URL as baseURL } from "../../utils/base";
import RegisterUserstoryService from "./registerUserstory.service";
import { FeedbackAlert } from "../../components/FeedbackAlert";
import { useAlert } from "../../hooks/useAlert";

export function RegisterUserstory() {
  const { open, close } = useAlert();

  const schema = Yup.object().shape({
    userStory: Yup.array().of(
      Yup.object().shape({
        userstoryNumber: Yup.string()
          .matches(
            /^[a-zA-Z0-9]+$/,
            "O campo deve conter apenas letras e números"
          )
          .required("Número da História de Usuário é um campo obrigatório!"),
        userstoryTitle: Yup.string().required(
          "Título da História de Usuário é um campo obrigatório!"
        ),
        card: Yup.string(),
        conversation: Yup.string(),
        confirmation: Yup.string(),
      })
    ),
  });

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
        {
          userstoryNumber: "",
          userstoryTitle: "",
          card: "",
          conversation: "",
          confirmation: "",
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "userStory",
  });

  const {
    handleBackButton,
    registerUserstory,
    handleBackBackCloseALert,
  } = RegisterUserstoryService(baseURL);

  const handleSubmitForm = (body) => {
    registerUserstory(body, contentSuccess, null, contentWarning);
  };

  const contentSuccess = (
    <FeedbackAlert.Root>
      <FeedbackAlert.Icon icon="checkcircle" />
      <FeedbackAlert.Title title="Excelente!" />
      <FeedbackAlert.Description
        style={{ textAlign: "center" }}
        description="História(s) de Usuário criada(as) com sucesso"
      />
      <div className={styles.alert__buttons} style={{ gap: "24px" }}>
        <Button.Root
          data-type="secondary"
          onClick={close}
        >
          <Button.Text>Ok, fechar</Button.Text>
        </Button.Root>
        <Button.Root
          data-type="primary"
          onClick={() => handleBackBackCloseALert()}
        >
          <Button.Text>Detalhes da sessão</Button.Text>
        </Button.Root>
      </div>
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
        <Button.Root
          data-type="primary"
          onClick={() => handleBackBackCloseALert()}
        >
          <Button.Text>Sim, continuar</Button.Text>
        </Button.Root>
      </div>
    </FeedbackAlert.Root>
  );

  const contentDeleteWarning = (index) => (
    <FeedbackAlert.Root>
      <FeedbackAlert.Icon icon="warningcircle" />
      <FeedbackAlert.Title title="Atenção!" />
      <FeedbackAlert.Description
        description={`Você tem certeza que deseja deletar a <span style="color: #008287; font-weight: 600;">US${watch(
          `userStory[${index}].userstoryNumber`
        )}</span>?`}
      />
      <div className={styles.alert__buttons} style={{ gap: "24px" }}>
        <Button.Root data-type="primary" onClick={close}>
          <Button.Text>Cancelar</Button.Text>
        </Button.Root>
        <Button.Root
          data-type="danger"
          onClick={() => {
            remove(index);
            close();
          }}
        >
          <Button.Text>Sim, Deletar</Button.Text>
        </Button.Root>
      </div>
    </FeedbackAlert.Root>
  );

  const handleRemoveClick = (index) => {
    open(contentDeleteWarning(index));
  };

  return (
    <div className={styles.registerUserstory__container}>
      <header>
        <span title="voltar">
          <IconChoice
            onClick={() => handleBackButton(watch(), contentWarning)}
            icon="back"
          />
          <h4>Criar Histórias de Usuário</h4>
        </span>
      </header>

      <form onSubmit={handleSubmit(handleSubmitForm)}>
        {fields.map((item, index) => {
          const isLast = index === fields.length - 1;
          const FieldSetContent = (
            <>
              <div className={styles.input__row}>
                <fieldset className={styles.number__field}>
                  <h6>Número da História de Usuário (obrigatório)</h6>
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

                <fieldset className={styles.title__field}>
                  <h6>Título da História de Usuário (obrigatório)</h6>
                  <Input.Root
                    type="text"
                    {...register(`userStory[${index}].userstoryTitle`)}
                    name={`userStory[${index}].userstoryTitle`}
                    id={`userStory[${index}].userstoryTitle`}
                  >
                    {errors.userStory?.[index]?.userstoryTitle && (
                      <Input.Error>
                        {errors.userStory[index].userstoryTitle.message}
                      </Input.Error>
                    )}
                  </Input.Root>
                </fieldset>
              </div>

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
              usNumber={watch(`userStory[${index}].userstoryNumber`)}
              key={item.id}
              onRemoveClick={() => handleRemoveClick(index)}
              showToggleIcon={true}
            >
              <div className={styles.generaldata__container}>
                {FieldSetContent}
              </div>
            </Expansible.Root>
          );
        })}

        <div className={styles.buttons__container}>
          <Button.Root
            type="button"
            disabled={!isValid}
            data-type="primary"
            onClick={() =>
              append({
                userstoryNumber: "",
                userstoryTitle: "",
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
            <Button.Root
              type="button"
              onClick={() => handleBackButton(watch(), contentWarning)}
              data-type="secondary"
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