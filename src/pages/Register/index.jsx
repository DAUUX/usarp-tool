import Wrapper from "../../components/Wrapper";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import StepThree from "./StepThree";
import axios from "axios";
import { StepStatus } from "../../components/StepStatus";
import { URL as baseURL } from "../../utils/base";
import { FeedbackAlert } from "../../components/FeedbackAlert";
import { useAlert } from "../../hooks/useAlert";

export default function Register() {
  const [steps, setSteps] = useState([]);
  const navigate = useNavigate();
  const handleStepNext = useCallback((e) => {
    setSteps((current) => [...current, e]);
  }, []);
  const { open, close } = useAlert();

  const handleStepPrevious = useCallback(() => {
    setSteps(steps.splice(steps.length, steps.length - 1));
  }, [steps]);

  const handleStepSubmit = (e) => {
    const body = steps.reduce((newObj, current) => {
      return { ...newObj, ...current };
    }, {});
    handleRegister({ ...body, ...e });
  };

  const handleOpenAlertError = () => {
    const content = (
      <FeedbackAlert.Root>
        <FeedbackAlert.Icon icon="closecircle" />
        <FeedbackAlert.Title title="Falha ao realizar login" />
        <FeedbackAlert.Description description="Instabilidade no servidor" />
        <FeedbackAlert.Button onClick={close} label="Ok, fechar" />
      </FeedbackAlert.Root>
    );
    open(content);
  };

  const handleOpenAlertSuccess = () => {
    const content = (
      <FeedbackAlert.Root>
        <FeedbackAlert.Icon icon="checkcircle" />
        <FeedbackAlert.Title
          title="Bem-vindo(a)"
          name={`, ${steps[0].fullName}!`}
        />
        <FeedbackAlert.Description description="Sua conta foi criada com sucesso" />
      </FeedbackAlert.Root>
    );
    open(content);
  };
  const handleRegister = (body) => {
    axios
      .post(baseURL + "/users", body)
      .then(() => {
        handleOpenAlertSuccess();
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        if (err.code === "ERR_NETWORK") {
          handleOpenAlertError();
        }
      });
  };

  return (
    <Wrapper>
      {steps.length === 0 ? (
        <StepOne next={handleStepNext}>
          <StepStatus.Root>
            <StepStatus.Circle
              text={"1"}
              color={steps.length === 0 ? "#ffff" : "#004548"}
              background={steps.length === 0 ? "#00686C" : "#CCEFF0"}
            />
            <StepStatus.Line width={"2px"} color={"#BDBDBD"} />
            <StepStatus.Circle
              text={"2"}
              color={steps.length === 1 ? "#ffff" : "#004548"}
              background={steps.length === 1 ? "#00686C" : "#CCEFF0"}
            />
            <StepStatus.Line width={"2px"} color={"#BDBDBD"} />
            <StepStatus.Circle
              text={"3"}
              color={steps.length >= 2 ? "#ffff" : "#004548"}
              background={steps.length >= 2 ? "#00686C" : "#CCEFF0"}
            />
          </StepStatus.Root>
        </StepOne>
      ) : (
        <></>
      )}
      {steps.length === 1 ? (
        <StepTwo
          fullName={steps[0].fullName}
          next={handleStepNext}
          previous={handleStepPrevious}
        >
          <StepStatus.Root>
            <StepStatus.Circle
              text={"1"}
              color={steps.length === 0 ? "#ffff" : "#004548"}
              background={steps.length === 0 ? "#00686C" : "#CCEFF0"}
            />
            <StepStatus.Line width={"2px"} color={"#BDBDBD"} />
            <StepStatus.Circle
              text={"2"}
              color={steps.length === 1 ? "#ffff" : "#004548"}
              background={steps.length === 1 ? "#00686C" : "#CCEFF0"}
            />
            <StepStatus.Line width={"2px"} color={"#BDBDBD"} />
            <StepStatus.Circle
              text={"3"}
              color={steps.length >= 2 ? "#ffff" : "#004548"}
              background={steps.length >= 2 ? "#00686C" : "#CCEFF0"}
            />
          </StepStatus.Root>
        </StepTwo>
      ) : (
        <></>
      )}
      {steps.length >= 2 ? (
        <StepThree
          fullName={"steps[0].fullName"}
          next={handleStepSubmit}
          previous={handleStepPrevious}
        >
          <StepStatus.Root>
            <StepStatus.Circle
              text={"1"}
              color={steps.length === 0 ? "#ffff" : "#004548"}
              background={steps.length === 0 ? "#00686C" : "#CCEFF0"}
            />
            <StepStatus.Line width={"2px"} color={"#BDBDBD"} />
            <StepStatus.Circle
              text={"2"}
              color={steps.length === 1 ? "#ffff" : "#004548"}
              background={steps.length === 1 ? "#00686C" : "#CCEFF0"}
            />
            <StepStatus.Line width={"2px"} color={"#BDBDBD"} />
            <StepStatus.Circle
              text={"3"}
              color={steps.length >= 2 ? "#ffff" : "#004548"}
              background={steps.length >= 2 ? "#00686C" : "#CCEFF0"}
            />
          </StepStatus.Root>
        </StepThree>
      ) : (
        <></>
      )}
    </Wrapper>
  );
}
