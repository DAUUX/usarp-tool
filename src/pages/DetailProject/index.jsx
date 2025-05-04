import { IconChoice } from "../../utils/IconChoice";
import { MemberItem } from "./components/MemberItem";
import { Button } from "../../components/Button";
import { FeedbackAlert } from "../../components/FeedbackAlert";
import { useAlert } from "../../hooks/useAlert";
import CardMeansurement from "./components/CardMeansurement";
import styles from "./styles.module.scss";
import { Dropdown } from "../../components/Dropdown";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const primary = {
  color: "#662914",
  background: "#FFE1D6",
  border: `1px solid #FFC2AD`,
};
const secondary = {
  color: "#004548",
  background: "#CCEFF0",
  border: `1px solid #99DEE1`,
};
const  tercery = {
  color: "#664F19",
  background: "#FFF3D9",
  border:`1px solid #FFE8B2`,
};

export function DetailProject() {

  const DefaultStatus = {
    active: "Ativo",
    blocked: "Bloqueado",
    closed: "Concluído/Encerrado",
  };
  const navigate = useNavigate();
  const { open, close } = useAlert();
  const [status, setStatus] = useState(DefaultStatus.active);
  const handlerStatus = (value) => {
    if(value != status && value !=  undefined){
      setStatus(value);
    }
  }

  const permission = true;
  const members = [
    {
      name: "Leslie Alexander",
      icon: "user02",
      email: "leslie@gmail.com",
      organization: "Moderador",
    },
    {
      name: "Darrell Steward",
      icon: "user03",
      email: "darrell@gmail.com",
      organization: "Participante",
    },
    {
      name: "Guy Hawkins",
      icon: "user04",
      email: "guy@gmail.com",
      organization: "Participante",
    },
    {
      name: "Ralph Edwards",
      icon: "user05",
      email: "ralph@gmail.com",
      organization: "Participante",
    },
    {
      name: "Jerome Bell",
      icon: "user06",
      email: "jerome@gmail.com",
      organization: "Participante",
    },
  ];

  const contentWarningchangeStatusBlocked = (
    <FeedbackAlert.Root>
      <FeedbackAlert.Icon icon="warningcircle" />
      <FeedbackAlert.Title title="Atenção!" />
      <FeedbackAlert.Description
        description={`Ao mudar o status para <span>Bloqueado</span>, não será permitido vincular Brainstormings e Histórias de Usuário a esse projeto. Além disso, o Moderador ficará impossibilitado de Editar os dados do projeto.`}
      />
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
        }}
      >
        <Button.Root data-type="secondary" onClick={() => close(null)}>
          <Button.Text>Cancelar</Button.Text>
        </Button.Root>
        <Button.Root data-type="primary" onClick={() => {}}>
          <Button.Text>Alterar status do projeto</Button.Text>
        </Button.Root>
      </div>
    </FeedbackAlert.Root>
  );

  const contentWarningchangeStatusClosed = (
    <FeedbackAlert.Root>
      <FeedbackAlert.Icon icon="warningcircle" />
      <FeedbackAlert.Title title="Atenção!" />
      <FeedbackAlert.Description
        description={`Ao mudar o status para <span>Concluído/Encerrado</span>, não será permitido vincular Brainstormings e Histórias de Usuário a esse projeto, apenas será permitido a visualização dos mesmos.`}
      />
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
        }}
      >
        <Button.Root data-type="secondary" onClick={() => close(null)}>
          <Button.Text>Cancelar</Button.Text>
        </Button.Root>
        <Button.Root data-type="primary" onClick={() => {}}>
          <Button.Text>Alterar status do projeto</Button.Text>
        </Button.Root>
      </div>
    </FeedbackAlert.Root>
  );

  const contentWarningchangeStatusActive = (
    <FeedbackAlert.Root>
      <FeedbackAlert.Icon icon="checkcircle" />
      <FeedbackAlert.Title title="Status alterado!" />
      <FeedbackAlert.Description
        description={`O status do projeto foi alterado com sucesso de <span>Ativo</span> para <span>Concluído/Encerrado</span>.`}
      />
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
        }}
      >
        <Button.Root data-type="primary" onClick={() => close(null)}>
          <Button.Text>Ok, fechar</Button.Text>
        </Button.Root>
      </div>
    </FeedbackAlert.Root>
  );

  return (
    <div className={styles.detailProject}>
      <header>
        <span aria-labelledby="title" onClick={() => navigate(-1)}>
          <IconChoice icon="back" />
          <h6 id="title">Detalhes do projeto</h6>
        </span>
      </header>
      <main>
        <session className={styles.card}>
          <div className={styles.card__header}>
            <h5>Nome do projeto</h5>
            <div>
              <span
                onClick={() => open(contentWarningchangeStatusClosed)}
                style={{ cursor: "pointer" }}
              >
                <IconChoice icon="star" />
              </span>

              {permission && (
                <span style={{ cursor: "pointer" }}>
                  <IconChoice icon="edit" />
                </span>
              )}
              {permission && (
                <span style={{ cursor: "pointer" }}>
                  <IconChoice icon="delete" />
                </span>
              )}
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
              <p>13/05/2024</p>
            </div>

            <div>
              <h6 >Status</h6>
              <Dropdown.Root
                onClick={(e) =>handlerStatus(e.target.innerText)}
                style={
                  status === DefaultStatus.blocked
                    ? primary
                    : status === DefaultStatus.closed
                    ? secondary
                    : tercery
                }
              >
                <Dropdown.Trigger title={status} />
                <Dropdown.Menu>
                  <Dropdown.Item value={DefaultStatus.active}>
                    {DefaultStatus.active}
                  </Dropdown.Item>
                  <Dropdown.Item value={DefaultStatus.blocked}>
                    {DefaultStatus.blocked}
                  </Dropdown.Item>
                  <Dropdown.Item value={DefaultStatus.closed}>
                    {DefaultStatus.closed}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Root>
            </div>
            <div>
              <h6>Dados do criador do projeto (Dono do projeto)</h6>
              <MemberItem
                name="Mateus Eugênio"
                icon="user01"
                email="mateus@gmail.com"
                organization="Organização XYZ"
                color="#664F19"
              />
            </div>
            <div>
              <h6>Membros</h6>
              <li>
                <ul>
                  {members.map((member, index) => (
                    <MemberItem
                      key={index}
                      name={member.name}
                      icon={member.icon}
                      email={member.email}
                      organization={member.organization}
                    />
                  ))}
                </ul>
              </li>
            </div>
          </div>
        </session>
        <session className={styles.meansurement}>
          <CardMeansurement
            icon={"statisticsLamp"}
            button={"yellow"}
            title={"Brainstormings"}
            value={1}
            line={"#FFDC8C"}
            color={"#997626"}
          />
          <CardMeansurement
            icon={"statisticsUserStory"}
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
