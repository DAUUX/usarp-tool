import styles from "./styles.module.scss";
import { SidebarOption } from "./SidebarOption";
import { AlertBox } from "./AlertBox";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState, createContext } from "react";
import { Dropdown } from "../DropdownMenu";
import { Button } from "../Button";
import { api } from "../../utils/axios.config";
import successIcon from "../../assets/icons/sucesS.png";
import attentionIcon from "../../assets/icons/att.jpg";
import errorIcon from "../../assets/icons/xx3.png";
import logo from "../../assets/images/logo.png";

export const FormSubmitContext = createContext(null);

export function ConfigurationsLayout() {

  const [alert, setAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [password, setPassword] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [pasteError, setPasteError] = useState(false);

  const MAX_ATTEMPTS = 3;
  const navigate = useNavigate();

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

  async function handleConfirmPassword() {
    try {
      await api.delete("/user/delete", {
        data: { password },
      });

      setModalStep(3);

      setTimeout(() => {
        setShowModal(false);
        navigate("/"); // ajuste aqui se quiser outra rota
      }, 1500);

    } catch (error) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= MAX_ATTEMPTS) {
        setModalStep(4);
      } else {
        setModalStep(2);
      }
    }
  }

  return (
    <>
      <main className={styles.Configuration}>
        <header className={styles.Configuration__Header}>
          <img src={logo} />
           <Dropdown />
        </header>

        <div className={styles.Configuration__BackLink}>
          <Link to="/">
            <img src="../src/assets/icons/backArrow.svg" alt="Voltar" />
            Voltar
          </Link>
        </div>

        {alert && (
          <AlertBox
            message={alert.message}
            type={alert.type}
            icon={alert.icon}
          />
        )}

        <div className={styles.Configuration__Wrapper}>
          <aside className={styles.Configuration__Sidebar}>
            <SidebarOption
              label="Configurações de perfil"
              link="./profile"
              icon="gear"
            />
            <SidebarOption
              label="Privacidade e segurança"
              link="./privacity"
              icon="lock"
            />

            <Button.Root
              className={styles.Configuration__Button}
              onClick={handleDeleteClick}
            >
              <Button.Icon
                iconName="delete"
                className={styles.Configuration__IconButton}
              />
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

      {showModal && (
        <div className={styles.ModalOverlay}>
          <div className={styles.ModalContent}>
            
            {modalStep === 1 && (
              <>
                <img src={attentionIcon} alt="Atenção" className={styles.ModalIcon} />

                <h2>Atenção!</h2>
                <p>
                  Você tem certeza que deseja apagar a conta?
                  <br />
                  Excluindo o seu perfil, <strong>todos os seus projetos</strong> serão apagados.
                </p>

                <div className={styles.ModalActions}>
                  <button onClick={closeModal} className={styles.CancelButton}>
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
                  <button onClick={closeModal} className={styles.CancelButton}>
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

            {modalStep === 3 && (
              <div className={styles.ModalSuccess}>
                <img src={successIcon} alt="Sucesso" className={styles.ModalIcon} />
                <h2>Conta excluída!</h2>
                <p>
                  Conta deletada com sucesso!
                  <br />
                  Redirecionando…
                </p>
              </div>
            )}

            {modalStep === 4 && (
              <div className={styles.ModalError}>
                <img src={errorIcon} alt="Erro" className={styles.ModalIcon} />

                <h2>Erro ao Excluir Conta</h2>
                <p>
                  Você ultrapassou seu limite de tentativas.
                  <br />
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
