import styles from "./styles.module.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import Wrapper from "../../../components/Wrapper";
import InputPassword from "../../../components/InputPassword";
import PasswordStrengthLevel from "../../../components/PasswordStrengthLevel";
import { useAlert } from "../../../hooks/useAlert";
import { FeedbackAlert } from "../../../components/FeedbackAlert";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../../services/api";

export default function ResetPassword() {
  const { userId, token } = useParams();
  const { open, close } = useAlert();
  const navigate = useNavigate();

  // Checa se params existem
  if (!userId || !token) {
    navigate("/login"); // redireciona se não houver token
  }

  const schema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Mínimo 8 caracteres")
      .max(15, "Máximo 15 caracteres")
      .matches(/[A-Z]/, "Deve ter letra maiúscula")
      .matches(/[a-z]/, "Deve ter letra minúscula")
      .matches(/[0-9]/, "Deve ter número")
      .matches(/[#?!@$%^&*-]/, "Deve ter caractere especial")
      .required("Senha obrigatória"),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password")], "As senhas devem ser iguais")
      .required("Confirmação obrigatória"),
  });

  const { formState, register, handleSubmit, getValues } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: { password: "", passwordConfirmation: "" },
    criteriaMode: "all",
  });

  const { errors } = formState;

  const handleSubmitForm = async (data) => {
    try {
      console.log("userId:", userId, "token:", token);

      // POST para o backend
      await api.post(`/auth/reset_password/${userId}/${token}`, {
        password: data.password,
      });

      const content = (
        <FeedbackAlert.Root>
          <FeedbackAlert.Icon icon="checkcircle" />
          <FeedbackAlert.Title title="Senha alterada" />
          <FeedbackAlert.Description
            description="Parabéns, sua senha foi alterada com sucesso!"
            style={{ textAlign: "center" }}
          />
        </FeedbackAlert.Root>
      );

      open(content);

      setTimeout(() => {
        close();
        navigate("/login"); // vai direto para login
      }, 3000);
    } catch (err) {
      console.error("Erro no reset de senha:", err);
      const content = (
        <FeedbackAlert.Root>
          <FeedbackAlert.Icon icon="error" />
          <FeedbackAlert.Title title="Erro" />
          <FeedbackAlert.Description
            description={
              err.response?.data?.message || "Não foi possível alterar a senha."
            }
            style={{ textAlign: "center" }}
          />
        </FeedbackAlert.Root>
      );
      open(content);
    }
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(handleSubmitForm)} className={styles.ResetPassword}>
        <div>
          <label htmlFor="password">Senha</label>
          <InputPassword
            register={register}
            label="password"
            autoFocus
            type="password"
            name="password"
            id="password"
            placeholder="•••••••••"
            minLength={8}
            required={!!errors.password}
          />
        </div>

        <p>
          Sua senha deve ter pelo menos 8 caracteres, com letras minúsculas e
          maiúsculas, números e caracteres especiais
        </p>

        <div>
          <label htmlFor="passwordConfirmation">Confirmar senha</label>
          <InputPassword
            register={register}
            label="passwordConfirmation"
            type="password"
            name="passwordConfirmation"
            id="passwordConfirmation"
            placeholder="•••••••••"
            required={!!errors.passwordConfirmation}
          />
        </div>

        <p>Digite a mesma senha do campo anterior</p>

        <PasswordStrengthLevel password={getValues("password")} />

        <button
          className={styles.ResetPassword__primaryButton}
          disabled={!formState.isValid}
          type="submit"
          style={{ marginTop: 24 }}
        >
          CONTINUAR
        </button>

        <Link to="/login" style={{ marginTop: 24 }}>
          <button
            className={styles.ResetPassword__secondaryButton}
            type="button"
            style={{ marginTop: 0 }}
          >
            VOLTAR
          </button>
        </Link>
      </form>
    </Wrapper>
  );
}
