import styles from "./styles.module.scss";
import { SidebarOption } from "./SidebarOption";
import { AlertBox } from "./AlertBox";
import { Link, Outlet } from "react-router-dom";
import { useState, createContext } from "react";
import { Button } from "../Button";
import Navbar from "../../layouts/Navbar";

export const FormSubmitContext = createContext(null);

export function ConfigurationsLayout() {
  const [alert, setAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [password, setPassword] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [pasteError, setPasteError] = useState(false);

  const MAX_ATTEMPTS = 3;
  const CORRECT_PASSWORD = "1234";

  function handleDeleteClick() {
    setShowModal(true);
    setModalStep(1);
    setPassword("");
    setAttempts(0);
  }

  function closeModal() {
    setShowModal(false);
    setPassword("");
    setAttempts(0);
  }

  function handleConfirmPassword() {
    if (password === CORRECT_PASSWORD) {
      setModalStep(3);
      setTimeout(() => {
        setShowModal(false);
      }, 3000);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= MAX_ATTEMPTS) {
        setModalStep(4); // Limite de senhas atingido
      } else {
        setModalStep(2); // Senha incorreta, mantém no passo 2
      }
    }
  }

  return (
    <>
      <main className={styles.Configuration}>
        <Navbar />
        <div className={styles.Configuration__BackLink}>
          <Link to="/">
            <img src="../src/assets/icons/backArrow.svg" alt="Voltar" />
            Voltar
          </Link>
        </div>

        {alert && <AlertBox message={alert.message} type={alert.type} icon={alert.icon} />}

        <div className={styles.Configuration__Wrapper}>
          <aside className={styles.Configuration__Sidebar}>
            <SidebarOption label="Configurações de perfil" link="./profile" icon="gear" />
            <SidebarOption label="Privacidade e segurança" link="./privacity" icon="lock" />
            <Button.Root className={styles.Configuration__Button} onClick={close}>
              <Button.Icon iconName="delete" className={styles.Configuration__IconButton}></Button.Icon>
              <Button.Text>Excluir conta</Button.Text>
            </Button.Root>
          </aside>

          <div className={styles.Configuration__Content}>
            <FormSubmitContext.Provider value={{ setAlert }}>
              <Outlet />
            </FormSubmitContext.Provider>
          </div>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className={styles.ModalOverlay}>
          <div className={styles.ModalContent}>
            {/* Etapa 1 - Confirmação inicial */}
            {modalStep === 1 && (
              <>
                <img
                  src={attentionIcon}
                  alt="Atenção"
                  className={styles.ModalIcon}
                />
                <h2>Atenção!</h2>
                <p>
                  Você tem certeza que deseja apagar o <strong>update?</strong>{" "}
                  Excluindo a sua conta agora, você estará excluindo os seus
                  projetos e os usuários vinculados a eles perderão o acesso.
                  <br />
                  Excluindo o seu perfil, <strong>10</strong> projetos serão
                  apagados.
                </p>
                <div className={styles.ModalActions}>
                  <button
                    onClick={closeModal}
                    className={styles.CancelButton}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => setModalStep(2)}
                    className={styles.ConfirmButton}
                  >
                    Sim, continuar
                  </button>
                </div>
              </>
            )}

            {/* Etapa 2 - Confirmação de senha */}
            {modalStep === 2 && (
              <>
                <h2>Excluir Conta</h2>

                {attempts > 0 && (
                  <div className={styles.ErrorMessage}>
                    Senha incorreta. Tentativas restantes: {MAX_ATTEMPTS - attempts}
                  </div>
                )}

                {pasteError && (
                  <div className={styles.ErrorMessage}>
                    Por segurança, não é permitido colar senhas.
                  </div>
                )}

                <form onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="password"
                    placeholder="Senha do perfil"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.PasswordInput}
                    onCopy={(e) => e.preventDefault()}
                    onCut={(e) => e.preventDefault()}
                    onDrop={(e) => e.preventDefault()}
                    onPaste={(e) => {
                      e.preventDefault();
                      setPasteError(true);
                      setTimeout(() => setPasteError(false), 3000);
                    }}
                  />
                </form>

                <div className={styles.ModalActions}>
                  <button
                    onClick={closeModal}
                    className={styles.CancelButton}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleConfirmPassword}
                    className={styles.ConfirmButton}
                  >
                    Confirmar exclusão
                  </button>
                </div>
              </>
            )}

            {/* Etapa 3 - Sucesso */}
            {modalStep === 3 && (
              <div className={styles.ModalSuccess}>
                <img
                  src="assets/icons/success.png"
                  alt="Sucesso"
                  className={styles.ModalIcon}
                />
                <h2>Conta excluída!</h2>
                <p>
                  Conta deletada com sucesso! <br />
                  Redirecionando para a página de login.
                </p>
              </div>
            )}

            {/* Etapa 4 - Limite de tentativas atingido */}
            {modalStep === 4 && (
              <div className={styles.ModalError}>
                <img
                  src={errorIcon}
                  alt="Erro"
                  className={styles.ModalIcon}
                />
                <h2>Erro ao Excluir Conta</h2>
                <p>
                  Você ultrapassou seu limite de tentativas. <br />
                  Tente novamente após 24 horas.
                </p>
                <div className={styles.ModalActions}>
                  <button
                    onClick={closeModal}
                    className={styles.ConfirmButton}
                    style={{ backgroundColor: "#00796B" }}
                  >
                    Ok, fechar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
