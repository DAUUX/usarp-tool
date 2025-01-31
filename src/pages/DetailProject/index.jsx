import { Chip } from "../../components/Chip";
import { IconChoice } from "../../utils/IconChoice";
import CardMeansurement from "./components/CardMeansurement";
import styles from "./styles.module.scss";

export function DetailProject() {
  return (
    <div className={styles.detailProject}>
      <header>
        <span aria-labelledby="title">
          <IconChoice icon="back" />
          <h6 id="title">Detalhes do projeto</h6>
        </span>
      </header>
      <main>
        <session className={styles.card}>
          <div className={styles.card__header}>
            <h5>Nome do projeto</h5>
            <div>
              <span>
                <IconChoice icon="star" />
              </span>
              <span>
                <IconChoice icon="edit" />
              </span>
              <span>
                <IconChoice icon="delete" />
              </span>
            </div>
          </div>
          <hr />
          <div className={styles.card__body}>
            <div>
              <h6>Descrição</h6>
              <p>
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book.
              </p>
            </div>
            <div>
              <h6>Data de criação</h6>
              <span>13/05/2024</span>
            </div>

            <div>
              <h6>Status</h6>
              <Chip
                label={"Ativo"}
                color={"#664F19"}
                backgroundColor={"#FFF3D9"}
                borderColor={"#FFE8B2"}
              />
            </div>

            <div>
              <h6>Dados do criador do projeto (Dono do projeto)</h6>
              <div>
                <IconChoice icon={"user02"} />
                <div>
                  <h6>Mateus Eugênio</h6>
                  <span>mateus@gmail.com</span>
                </div>
                <span>Organização XYZ</span>
              </div>
            </div>

            <div>
              <h6>Membros</h6>
              <span>Ativo</span>
            </div>
          </div>
        </session>
        <session className={styles.meansurement}>
          <CardMeansurement
            icon={"star"}
            button={"yellow"}
            title={"Brainstormings"}
            value={1}
            line={"#FFDC8C"}
            color={"#997626"}
          />
          <CardMeansurement
            icon={"star"}
            button={"red"}
            title={"Brainstormings"}
            value={1}
            line={"#FEA484"}
            color={"#CB5228"}
          />
        </session>
      </main>
    </div>
  );
}
