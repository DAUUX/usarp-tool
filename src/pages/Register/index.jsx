import Wrapper from "../../components/Wrapper";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import StepThree from "./StepThree";
import axios from "axios";
import { StepStatus } from "../../components/StepStatus";
import { URL as baseURL } from "../../utils/base";
import { IconChoice } from "../../utils/IconChoice";
import { Toast } from "../../components/Toast";

export default function Register() {
  const [steps, setSteps] = useState([]);
  const navigate = useNavigate();
  const handleStepNext = useCallback((e) => {
    setSteps((current) => [...current, e]);
  }, []);

  const handleStepPrevious = useCallback(() => {
    setSteps(steps.splice(steps.length, steps.length - 1));
  }, [steps]);

  const handleStepSubmit = (e) => {
    const body = steps.reduce((newObj, current) => {
      return { ...newObj, ...current };
    }, {});
    handleRegister({ ...body, ...e });
  };

  const handleRegister = (body) => {
    axios
      .post(baseURL + "/users", body)
      .then(() => {
        toast(
          (t) => (
            <Toast
              type={"success"}
              message={"Cadastro realizado com sucesso!"}
              onClick={() => toast.dismiss(t.id)}
            >
              <IconChoice
                icon="check"
                width="24px"
                height="24px"
                color="#fff"
              />
            </Toast>
          ),
          {
            style: {
              backgroundColor: "var(--th-color-text-success)",
              borderRadius: "10px",
            },
          }
        );
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setSteps(steps.splice(steps.length, steps.length - 1));
        toast(
          (t) => (
            <Toast
              type={"error"}
              message={"Error Inesperado!"}
              onClick={() => toast.dismiss(t.id)}
            >
              <IconChoice
                icon="close"
                width="24px"
                height="24px"
                color="#fff"
              />
            </Toast>
          ),
          {
            style: {
              backgroundColor: "var(--th-color-text-error)",
              borderRadius: "10px",
            },
          }
        );
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
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{
          top: 200,
          left: 20,
          bottom: 20,
          right: 20,
        }}
        toastOptions={{
          // Define default options
          className: "",
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </Wrapper>
  );
}
