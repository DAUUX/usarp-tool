import styles from "./styles.module.scss";
import Wrapper from "../../components/Wrapper";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IconChoice } from '../../utils/IconChoice';
import { Modal } from "../../components/Modal";

export default function PasswordRecover() {

  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [warningDisplay, setWarningDisplay] = useState(false);

  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Dado inválido")
      .required("Dado inválido"),
  });

  const { register, handleSubmit, formState } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      email: email
    }
  });

  const { errors } = formState;
  const handleSubmitForm = (data) => {
    setWarningDisplay(false);

    setEmailSent(true);
    setEmail(data.email);
  };

  const navigate = useNavigate();

  return (
    <section className={styles.recoverPassword__}>
      {emailSent ?
        <main className={styles.recoverPassword__feedback}>
          <div>
            <IconChoice
              icon="checkcircle"
            />
            <h6>E-mail enviado!</h6>
            <p>Por favor, verifique o e-mail que enviamos para <span>{email}</span></p>
            <p>Não recebeu o e-mail? <span onClick={() => setEmailSent(false)}>Reenviar</span></p>
          </div>
        </main>
        :
        <Wrapper>
          <div className={styles.recoverPassword__form}>
            <h1>Recuperar senha</h1>
            <p>
              Por favor, digite o e-mail da sua conta. Enviaremos um
              e-mail com instruções para você recuperar sua senha.
            </p>
            <form>
              <div>
                <label htmlFor="email">E-mail</label>
                <input
                  {...register("email")}
                  autoFocus={true}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="exemplo@usarp.com"
                  required={errors.email ? true : false}
                />
                {errors.email && (
                  <p className={styles.card__error}>{errors.email.message}</p>
                )}
              </div>
              <button
                className={styles.recoverPassword__primaryButton}
                disabled={!formState.isValid}
                type="button"
                onClick={() => setWarningDisplay(true)}
              >
                CONTINUAR
              </button>
              <button
                className={styles.recoverPassword__secondaryButton}
                type="button"
                onClick={() => navigate(-1)}
              >
                VOLTAR
              </button>
            </form>
          </div>
          <Modal.Root isOpen={warningDisplay}>
            <Modal.Icon icon="warning" color="var(--white)" />
            <Modal.Text
              title="Atenção!"
              description="Por motivos de segurança ao prosseguir com a alteração, suas contas serão desautenticadas dos dispositivos conectados."
            />
            <Modal.Button
              primaryButton={{
                label: "Continuar",
                onClick: handleSubmit(handleSubmitForm)
              }}
              secondaryButton={{
                label: "Cancelar",
                onClick: () => setWarningDisplay(false)
              }}
            />
          </Modal.Root>
        </Wrapper>
      }
    </section>
  )
}