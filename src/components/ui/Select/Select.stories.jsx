import Select from "./Select";

export default {
  title: "UI/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: {
      control: "text",
      description: "Rótulo do select",
    },
    value: {
      control: "text",
      description: "Valor selecionado",
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
    fullWidth: {
      control: "boolean",
      description: "Ocupar largura total",
    },
    helperText: {
      control: "text",
      description: "Texto de ajuda ou erro abaixo do campo",
    },
    onChange: {
      action: "changed",
      description: "Função chamada quando o valor muda",
    },
    options: {
      control: "object",
      description: "Array de opções { value, label }",
    },
    sx: {
      control: "object",
      description: "Estilos adicionais do Material-UI",
    },
  },
};

const Template = (args) => (
  <div style={{ width: "300px" }}>
    <Select {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  label: "Selecione uma opção",
  options: [
    { value: 1, label: "Opção 1" },
    { value: 2, label: "Opção 2" },
    { value: 3, label: "Opção 3" },
  ],
};
Default.parameters = {
  docs: {
    description: {
      story: "Select básico com opções simples.",
    },
  },
};

export const WithValue = Template.bind({});
WithValue.args = {
  label: "Selecione uma opção",
  value: 2,
  options: [
    { value: 1, label: "Opção 1" },
    { value: 2, label: "Opção 2" },
    { value: 3, label: "Opção 3" },
  ],
};
WithValue.parameters = {
  docs: {
    description: {
      story: "Select com um valor pré-selecionado.",
    },
  },
};

export const WithError = Template.bind({});
WithError.args = {
  label: "Selecione uma opção",
  error: true,
  helperText: "Este campo é obrigatório",
  options: [
    { value: 1, label: "Opção 1" },
    { value: 2, label: "Opção 2" },
    { value: 3, label: "Opção 3" },
  ],
};
WithError.parameters = {
  docs: {
    description: {
      story: "Select em estado de erro com mensagem de validação.",
    },
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Selecione uma opção",
  disabled: true,
  value: 2,
  options: [
    { value: 1, label: "Opção 1" },
    { value: 2, label: "Opção 2" },
    { value: 3, label: "Opção 3" },
  ],
};
Disabled.parameters = {
  docs: {
    description: {
      story: "Select desabilitado - usuário não pode interagir.",
    },
  },
};

export const Required = Template.bind({});
Required.args = {
  label: "Selecione uma opção",
  required: true,
  helperText: "Este campo é obrigatório",
  options: [
    { value: 1, label: "Opção 1" },
    { value: 2, label: "Opção 2" },
    { value: 3, label: "Opção 3" },
  ],
};
Required.parameters = {
  docs: {
    description: {
      story: "Select marcado como obrigatório.",
    },
  },
};
