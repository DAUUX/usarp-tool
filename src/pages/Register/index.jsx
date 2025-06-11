import Wrapper from "../../components/Wrapper";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import { StepStatus } from "../../components/StepStatus";
import { URL as baseURL } from "../../utils/base";
import { FeedbackAlert } from "../../components/FeedbackAlert";
import { useAlert } from "../../hooks/useAlert";
import { RegisterProvider, useRegister } from "./contexts/RegisterContext";
import RegisterService from "./register.service";
import { useTranslation } from "react-i18next";

function RegisterContent() {
  const { close } = useAlert();
  const { formData, currentStep, resetForm } = useRegister();
  const { Register } = RegisterService(baseURL);
  const { t } = useTranslation();

  const handleOpenAlertError = (
    <FeedbackAlert.Root>
      <FeedbackAlert.Icon icon="closecircle" />
      <FeedbackAlert.Title title={t("cadastrarFeedbackAlertError")} />
      <FeedbackAlert.Description
        description={t("cadastrarFeedbackAlertErrorDes")}
      />
      <FeedbackAlert.Button onClick={close} label={t("loginAlertErrorBtn")} />
    </FeedbackAlert.Root>
  );
  const handleOpenAlertSuccess = (
    <FeedbackAlert.Root>
      <FeedbackAlert.Icon icon="checkcircle" />
      <FeedbackAlert.Title
        title={t("loginAlertSucesso")}
        name={`, ${formData.fullName}!`}
      />
      <FeedbackAlert.Description
        description={t("cadastrarFeedbackAlertSucesso")}
      />
    </FeedbackAlert.Root>
  );

  const handleRegister = async (dataToSend = null) => {
    const response = await Register(
      dataToSend,
      handleOpenAlertSuccess,
      handleOpenAlertError
    );
    if (response) {
      resetForm();
    }
  };

  return (
    <Wrapper>
      {currentStep === 1 && (
        <StepOne>
          <StepStatus.Root>
            <StepStatus.Circle
              text={"1"}
              color={currentStep === 1 ? "#ffff" : "#004548"}
              background={currentStep === 1 ? "#00686C" : "#CCEFF0"}
            />
            <StepStatus.Line width={"2px"} color={"#BDBDBD"} />
            <StepStatus.Circle
              text={"2"}
              color={currentStep === 2 ? "#ffff" : "#004548"}
              background={currentStep === 2 ? "#00686C" : "#CCEFF0"}
            />
            <StepStatus.Line width={"2px"} color={"#BDBDBD"} />
            <StepStatus.Circle
              text={"3"}
              color={currentStep === 3 ? "#ffff" : "#004548"}
              background={currentStep === 3 ? "#00686C" : "#CCEFF0"}
            />
          </StepStatus.Root>
        </StepOne>
      )}

      {currentStep === 2 && (
        <StepTwo fullName={formData.fullName}>
          <StepStatus.Root>
            <StepStatus.Circle
              text={"1"}
              color="#004548"
              background="#CCEFF0"
            />
            <StepStatus.Line width={"2px"} color={"#BDBDBD"} />
            <StepStatus.Circle text={"2"} color="#ffff" background="#00686C" />
            <StepStatus.Line width={"2px"} color={"#BDBDBD"} />
            <StepStatus.Circle
              text={"3"}
              color="#004548"
              background="#CCEFF0"
            />
          </StepStatus.Root>
        </StepTwo>
      )}

      {currentStep === 3 && (
        <StepThree fullName={formData.fullName} onSubmit={handleRegister}>
          <StepStatus.Root>
            <StepStatus.Circle
              text={"1"}
              color="#004548"
              background="#CCEFF0"
            />
            <StepStatus.Line width={"2px"} color={"#BDBDBD"} />
            <StepStatus.Circle
              text={"2"}
              color="#004548"
              background="#CCEFF0"
            />
            <StepStatus.Line width={"2px"} color={"#BDBDBD"} />
            <StepStatus.Circle text={"3"} color="#ffff" background="#00686C" />
          </StepStatus.Root>
        </StepThree>
      )}
    </Wrapper>
  );
}

export default function Register() {
  return (
    <RegisterProvider>
      <RegisterContent />
    </RegisterProvider>
  );
}
