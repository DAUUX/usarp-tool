import styles from "./styles.module.scss";
import MintenanceImg from "../../assets/images/maintenance.png";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";

export function Maintenance() {
  return (
    <div className={styles.maintenance__container}>
      <div className={styles.maintenance__body}>
        <section>
          <h1>
            Estamos realizando uma breve atualização para melhorar sua
            experiência!
          </h1>
          <p>O sistema estará de volta em breve! Agradecemos sua paciência.</p>
          <Link to={"/home"}>
            <Button.Root data-type="primary">
              <Button.Text>Voltar para início</Button.Text>
            </Button.Root>
          </Link>
        </section>
        <img src={MintenanceImg} width={800} alt="" />
      </div>
    </div>
  );
}
