import styles from "./styles.module.scss";
import { Link, useNavigate } from "react-router-dom";
import Wrapper from "../../../components/Wrapper";
import InputPassword from "../../../components/InputPassword";
import PasswordStrengthLevel from "../../../components/PasswordStrengthLevel";
import { useAlert } from "../../../hooks/useAlert";
import { FeedbackAlert } from "../../../components/FeedbackAlert";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function ResetPassword() {
  const schema = Yup.object().shape({
    password: Yup.string()
      .min(8, "A senha deve conter pelo menos 8 caracteres!")
      .max(15, "A senha deve conter no máximo 15 caracteres!")
      .matches(/[A-Z]/g, "A senha deve conter pelo menos uma letra maiúscula!")
      .matches(/[a-z]/g, "A senha deve conter pelo menos uma letra minúscula!")
      .matches(/[0-9]/g, "A senha deve conter pelo menos um número!")
      .matches(
        /[#?!@$%^&*-]/g,
        "A senha deve conter pelo menos um caractere especial!"
      )
      .required(),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password')], "As senhas devem ser iguais!")
      .required("As senhas devem ser iguais!"),
  });

  const { open, close } = useAlert();
  const navigate = useNavigate();

  const handleSubmitForm = (body) => {
    console.log(body);
    const content = (
      <FeedbackAlert.Root>
        <FeedbackAlert.Icon icon="checkcircle" />
        <FeedbackAlert.Title title="Senha alterada" />
        <FeedbackAlert.Description
          description="Parabéns, sua senha foi alterada com sucesso!"
          style={{textAlign: 'center'}}
        />
      </FeedbackAlert.Root>
    );
    open(content);
    setTimeout(() => {
      close();
      navigate("../../login");
    }, 3000);
  }

  const { formState, register, handleSubmit, getValues } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      password: "",
    },
    criteriaMode: "all",
  })

  const { errors } = formState;

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(handleSubmitForm)} className={styles.ResetPassword}>
        <div>
          <label htmlFor="password">Senha</label>
          <InputPassword
            register={register}
            label={"password"}
            autoFocus={true}
            type={"password"}
            name={"password"}
            id={"password"}
            placeholder="•••••••••"
            minLength="8"
            required={errors.password ? true : false}
          />
          {errors.password && (
            <p className={styles.ResetPassword__error}>
              {errors.password.message}
            </p>
          )}
        </div>
        <PasswordStrengthLevel password={getValues("password")} />
        <div>
          <label htmlFor="passwordConfirmation">Confirmar senha</label>
          <InputPassword
            register={register}
            label={"passwordConfirmation"}
            type={"password"}
            name={"passwordConfirmation"}
            id={"passwordConfirmation"}
            placeholder="•••••••••"
            required={errors.passwordConfirmation ? true : false}
          />
          {errors.passwordConfirmation && (
            <p className={styles.ResetPassword__error}>
              {errors.passwordConfirmation.message}
            </p>
          )}
        </div>
        <button
          className={styles.ResetPassword__primaryButton}
          disabled={!formState.isValid}
          type="submit"
        >
          CONTINUAR
        </button>
        <Link to="../../login">
          <button
            className={styles.ResetPassword__secondaryButton}
            type="button"
          >
            VOLTAR
          </button>
        </Link>
      </form>
    </Wrapper>
  );
}