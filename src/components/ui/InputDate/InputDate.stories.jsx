import InputDate from "./InputDate";

export default {
  title: "UI/InputDate",
  component: InputDate,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: {
      control: "text",
      description: "Rótulo do campo de data",
    },
    value: {
      control: "text",
      description: "Valor da data no formato YYYY-MM-DD",
    },
    error: {
      control: "boolean",
      description: "Indica se o campo está em estado de erro",
    },
    disabled: {
      control: "boolean",
      description: "Indica se o campo está desabilitado",
    },
    required: {
      control: "boolean",
      description: "Indica se o campo é obrigatório",
    },
    helperText: {
      control: "text",
      description: "Texto de ajuda ou erro abaixo do campo",
    },
    sx: {
      control: "object",
      description: "Estilos adicionais do Material-UI",
    },
    onChange: {
      action: "changed",
      description: "Função chamada quando o valor muda",
    },
  },
};

const Template = (args) => (
  <div style={{ width: "300px" }}>
    <InputDate {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  label: "Data de nascimento",
};
Default.parameters = {
  docs: {
    description: {
      story: "Campo de data padrão com label flutuante.",
    },
  },
};

export const WithError = Template.bind({});
WithError.args = {
  label: "Data de expiração",
  error: true,
  helperText: "Data não pode ser no passado",
  value: "2023-01-01",
};
WithError.parameters = {
  docs: {
    description: {
      story: "Campo de data em estado de erro com mensagem de validação.",
    },
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Data de contratação",
  value: "2024-03-20",
  disabled: true,
};
Disabled.parameters = {
  docs: {
    description: {
      story: "Campo de data desabilitado - usuário não pode interagir.",
    },
  },
};

export const Required = Template.bind({});
Required.args = {
  label: "Data de entrega",
  required: true,
  helperText: "Este campo é obrigatório",
};
Required.parameters = {
  docs: {
    description: {
      story: "Campo de data marcado como obrigatório.",
    },
  },
};
