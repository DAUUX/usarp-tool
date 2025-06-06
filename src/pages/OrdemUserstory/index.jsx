import React from 'react';
import { useForm } from 'react-hook-form';
import styles from "./styles.module.scss";
import { Button } from "../../components/Button";
import { Text } from "../../components/Text";
import { InputCombobox } from "../../components/InputCombobox";

export function OrdemUserstory() {
  const userStories = [
    { id: 'us001', title: 'US001 - Cadastro de usuário no sistema', pririty: 3 },
    { id: 'us002', title: 'US002 - Login de usuário no sistema', pririty: 2 },
    { id: 'us003', title: 'US003 - Recuperação de senha do usuário', pririty: 1 },
  ];

  const initialDefaultValues = {};
  const priorityFieldNames = userStories.map(us => {
    const fieldName = `prioridade_${us.id}`;
    initialDefaultValues[fieldName] = null;
    return fieldName;
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: initialDefaultValues,
  });

  const allWatchedValues = watch();

  const onSubmit = (data) => {
    console.log("Dados do formulário (objetos de opção):", data);
    const simpleData = Object.keys(data).reduce((acc, key) => {
      acc[key] = data[key] ? data[key].value : null;
      return acc;
    }, {});
    console.log("Dados simplificados (apenas valores):", simpleData);
  };

  const opcoesDePrioridadeCompleta = userStories.map((us, index) => ({
    value: (index + 1).toString(),
    label: (index + 1).toString(),
  }));

  const getFilteredOptions = (currentFieldName) => {
    const selectedValuesInOtherFields = [];
    priorityFieldNames.forEach(fieldName => {
      if (fieldName !== currentFieldName) {
        const selectedOptionObject = allWatchedValues[fieldName];
        if (selectedOptionObject && selectedOptionObject.value) {
          selectedValuesInOtherFields.push(selectedOptionObject.value);
        }
      }
    });
    const currentValueForThisField = allWatchedValues[currentFieldName];
    return opcoesDePrioridadeCompleta.filter(option => {
      if (currentValueForThisField && option.value === currentValueForThisField.value) {
        return true;
      }
      return !selectedValuesInOtherFields.includes(option.value);
    });
  };

  return (
    <div className={styles.ordemUserstory__container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.ordemUserstory__box_form_wrapper}>
        <div className={styles.ordemUserstory__box}>
          <div className={styles.top}>
            <Text.Root className={styles.textRootContainer}>
              <Text.Headline as="h6">Ordem das Histórias de Usuário</Text.Headline>
              <Text.Caption data-type="regular">Defina a ordem em que as Histórias de Usuário serão discutidas no Brainstorming</Text.Caption>
            </Text.Root>
            <div className={styles.iconeSair}>
              <Button.Root data-type="tertiary">
                <Button.Icon iconName="close" />
              </Button.Root>
            </div>
          </div>
          <div className={styles.mid}>
            {userStories.map((us) => {
              const fieldName = `prioridade_${us.id}`;
              const currentOptions = getFilteredOptions(fieldName);
              const [ titleParts1, titleParts2 ] = us.title.split(" - ", 2);
              const usPrefix = titleParts1;
              const usSuffix = titleParts1.length > 1 ? ` - ${titleParts2}` : "";

              return (
                <div key={us.id} className={styles.comboboxWrapperPequeno}>
                  <Text.Root className={styles.textRootContainer}>
                    <Text.Body data-type="medium">
                      <strong>{usPrefix}</strong>{usSuffix}
                    </Text.Body>
                  </Text.Root>
                  <InputCombobox.Root>
                    <InputCombobox.Select
                      name={fieldName}
                      control={control}
                      options={currentOptions}
                      error={errors[fieldName]}
                      rules={{ required: "Por favor, selecione uma prioridade." }}
                      placeholder="Prioridade"
                    >
                      {errors[fieldName] && (
                        <InputCombobox.Error>
                          {errors[fieldName].message}
                        </InputCombobox.Error>
                      )}
                    </InputCombobox.Select>
                  </InputCombobox.Root>
                </div>
              );
            })}
          </div>
          <div className={styles.bot}>
            <Button.Root data-type="secondary" type="button">
              <Button.Text>cancelar</Button.Text>
            </Button.Root>
            <Button.Root data-type="primary" type="submit">
              <Button.Text>Prosseguir para sessão</Button.Text>
            </Button.Root>
          </div>
        </div>
      </form>
    </div>
  );
}