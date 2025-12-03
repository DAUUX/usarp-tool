import FormStepper from "./FormStepper";

export default {
  title: "Components/FormStepper",
  component: FormStepper,
  tags: ["autodocs"],
  argTypes: {
    activeStep: {
      control: { type: "number", min: 0 },
      description: "Define o passo ativo no Stepper (0 = primeiro passo).",
    },
    steps: {
      control: { type: "array" },
      description: "Array de labels para cada step.",
    },
  },
};

const Templatelabels = ["Email & Nome", "Senha", "Dados do Perfil"];
const Template = (args) => <FormStepper {...args} />;

export const Default = Template.bind({});
Default.args = {
  activeStep: 0,
  steps: Templatelabels,
};

export const SecondStep = Template.bind({});
SecondStep.args = {
  activeStep: 1,
  steps: Templatelabels,
};

export const LastStep = Template.bind({});
LastStep.args = {
  activeStep: 2,
  steps: Templatelabels,
};
