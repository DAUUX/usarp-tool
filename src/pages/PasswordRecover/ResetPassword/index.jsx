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
      .min(8, "")
      .max(15, "")
      .matches(/[A-Z]/g, "")
      .matches(/[a-z]/g, "")
      .matches(/[0-9]/g, "")
      .matches(
        /[#?!@$%^&*-]/g,
        "A senha deve conter pelo menos um caractere especial!"
      )
      .required(),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password')], "")
      .required(""),
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
        </div>
        <p>
          Sua senha deve ter pelo menos 8 caracteres, com letras
          minúsculas e maiúsculas, números e caracteres especiais
        </p>
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
        </div>
        <p>
          Digite a mesma senha do campo anterior
        </p>
        <PasswordStrengthLevel password={getValues("password")} />
        <button
          className={styles.ResetPassword__primaryButton}
          disabled={!formState.isValid}
          type="submit"
          style={{marginTop: 24 + "px"}}
        >
          CONTINUAR
        </button>
        <Link to="../../login" style={{marginTop: 24 + "px"}}>
          <button
            className={styles.ResetPassword__secondaryButton}
            type="button"
            style={{marginTop: 0}}
          >
            VOLTAR
          </button>
        </Link>
      </form>
    </Wrapper>
  );
}