import Button from "./Button";
import { Add, Send } from "@mui/icons-material";
import { baseSx, disableSx, outlineSx, textSx } from "./styles";

export default {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["contained", "outlined", "text"],
      description: "Variante visual do botão",
    },
    disabled: {
      control: "boolean",
      description: "Estado desabilitado do botão",
    },
    fullWidth: {
      control: "boolean",
      description: "O botão ocupa toda a largura disponível",
    },
    type: {
      control: { type: "select" },
      options: ["button", "submit", "reset"],
      description: "Tipo do botão",
    },
    iconPosition: {
      control: { type: "select" },
      options: ["start", "end"],
      description: "Posição do ícone em relação ao texto",
    },
    children: {
      control: "text",
      description: "Texto do botão",
    },
    onClick: {
      action: "clicked",
      description: "Função chamada quando o botão é clicado",
    },
    sx: {
      control: "object",
      description: "Estilos adicionais do Material-UI",
    },
  },
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Botão Padrão",
  variant: "contained",
  sx: { ...baseSx },
};
Default.parameters = {
  docs: {
    description: {
      story: "Botão padrão na variante contained (preenchido).",
    },
  },
};

export const WithStartIcon = Template.bind({});
WithStartIcon.args = {
  children: "Adicionar Item",
  icon: <Add />,
  iconPosition: "start",
  variant: "contained",
  sx: { ...baseSx },
};
WithStartIcon.parameters = {
  docs: {
    description: {
      story: "Botão com ícone posicionado antes do texto.",
    },
  },
};

export const WithEndIcon = Template.bind({});
WithEndIcon.args = {
  children: "Enviar",
  icon: <Send />,
  iconPosition: "end",
  variant: "contained",
  sx: { ...baseSx },
};
WithEndIcon.parameters = {
  docs: {
    description: {
      story: "Botão com ícone posicionado depois do texto.",
    },
  },
};

export const Outlined = Template.bind({});
Outlined.args = {
  children: "Botão Outlined",
  variant: "outlined",
  sx: { ...outlineSx },
};
Outlined.parameters = {
  docs: {
    description: {
      story: "Botão na variante outlined (com borda).",
    },
  },
};

export const Text = Template.bind({});
Text.args = {
  children: "Botão Text",
  variant: "text",
  sx: { ...textSx },
};
Text.parameters = {
  docs: {
    description: {
      story: "Botão na variante text (apenas texto).",
    },
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: "Botão Desabilitado",
  disabled: true,
  variant: "contained",
  sx: { ...disableSx },
};
Disabled.parameters = {
  docs: {
    description: {
      story: "Botão em estado desabilitado - não pode ser clicado.",
    },
  },
};
