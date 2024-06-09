import { Button } from "../../components/Button";
import { Input } from "../../components/Input/indes";
import { IconChoice } from "../../utils/IconChoice";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./styles.module.scss";
import { useFieldArray, useForm } from "react-hook-form";
import { TooltipInfo } from "../../components/TooltipInfo";
import { InputTextarea } from "../../components/InputTextarea/indes";
import {
  templateCard,
  templateConfirmation,
  templateConversation,
} from "../../utils/templateText";
import { Expansible } from "../../components/Expansible/indes";
import { URL as baseURL } from "../../utils/base";
import { InputCombobox } from "../../components/InputCombobox";
import RegisterUserstoryService from "./registerUserstory.service";
import { FeedbackAlert } from "../../components/FeedbackAlert";

export function RegisterUserstory() {
  const schema = Yup.object().shape({
    userStory: Yup.array().of(
      Yup.object().shape({
        userstoryNumber: Yup.number()
          .typeError("Número da História de Usuário é um campo obrigatório!")
          .required("Número da História de Usuário é um campo obrigatório!"),
        card: Yup.string().required("Cartão é um campo obrigatório!"),
        conversation: Yup.string().required("Conversa é um campo obrigatório!"),
        confirmation: Yup.string().required(
          "Confirmação é um campo obrigatório!"
        ),
      })
    ),
    project: Yup.string()
      .transform((value, originalValue) => {
        if (originalValue && typeof originalValue === "object") {
          return originalValue.label;
        }
        return value;
      })
      .required("Projeto e um campo obrigatória"),
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
        { userstoryNumber: "", card: "", conversation: "", confirmation: "" },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "userStory",
  });
  
  const {
    data: listProject,
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
      <FeedbackAlert.Title title="Excelente" />
      <FeedbackAlert.Description
        style={{ textAlign: "center" }}
        description="Novas História de usuário adicionadas!"
      />
      <FeedbackAlert.Button onClick={()=>handleBackBackCloseALert()} label="Visualizar em projetos" />
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
        <Button.Root data-type="primary" onClick={()=>handleBackBackCloseALert()}>
          <Button.Text>Sim, continuar</Button.Text>
        </Button.Root>
      </div>
    </FeedbackAlert.Root>
  );
  return (
    <div className={styles.registerUserstory__container}>
      <header>
        <span title="voltar">
          <IconChoice onClick={() => handleBackButton(watch(), contentWarning)} icon="back" />
          <h4>Criar Histórias de Usuário</h4>
        </span>
      </header>

      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className={styles.generaldata__container}>
          <fieldset style={{paddingBottom:"1.5rem"}}>
            <h6>Selecionar projeto</h6>
            <InputCombobox.Root>
              <InputCombobox.Select
                name={`project`}
                defaultValue=""
                error={errors.project}
                control={control}
                required={!!errors.project}
                options={listProject}
              />
              {errors.project && (
                <InputCombobox.Error>
                  {errors.project.message}
                </InputCombobox.Error>
              )}
            </InputCombobox.Root>
          </fieldset>
        </div>

        {fields.map((item, index) => {
          const isLast = index === fields.length - 1;
          const FieldSetContent = (
            <>
              <fieldset>
                <h6>Número da História de Usuário</h6>
                <Input.Root
                  type="number"
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
              usNumber={watch(`userStory[${index}].userstoryNumber`)}
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
            type="button"
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
            <Button.Root
              type="button"
              onClick={()=>handleBackButton(watch(), contentWarning)}
              data-type="secondary"
            >
              <Button.Text >Cancelar</Button.Text>
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
