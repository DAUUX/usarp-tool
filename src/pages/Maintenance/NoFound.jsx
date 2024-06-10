import styles from "./styles.module.scss";
import MintenanceImg from "../../assets/images/not_found.png";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";

export function NoFound() {
  return (
    <div className={styles.noFound__container}>
      <div className={styles.noFound__body}>
        <section>
          <h1>Ops, página não encontrada</h1>
          <p>
            Parece que você encontrou um caminho sem saída. Mas se preocupe você
            pode voltar e explorar outras partes da nossa ferramenta.
          </p>
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
