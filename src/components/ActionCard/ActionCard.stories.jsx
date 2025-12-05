import { ActionCard } from "./ActionCard";
import { images } from "../../assets/images/images";

const cssVariables = {
  "--font-inter": '"Inter", sans-serif',

  // Primary Palette (Cyans)
  "--primary-100": "#cceff0",
  "--primary-200": "#99dee1",
  "--primary-800": "#004548",

  "--tertiary-100": "#fff3d9",
  "--tertiary-200": "#ffe8b2",
  "--tertiary-800": "#664f19",
};

const meta = {
  title: "Components/ActionCard",
  component: ActionCard,
  tags: ["autodocs"],

  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["primary", "secondary"],
      description: "Define o tema de cores do card.",
      table: { defaultValue: { summary: "primary" } },
    },
    disabled: {
      control: "boolean",
      description: "Desabilita interações e aplica filtro p/b.",
    },
    label: {
      control: "text",
      description: "Texto do botão.",
    },
    image: {
      control: "select",
      options: Object.keys(images),
      mapping: {
        folder: images.folder,
        lightbulb: images.lightBulb,
      },
      description: "Ícone do card.",
    },
    onClick: { action: "clicked" },
  },

  decorators: [
    (Story) => (
      <div
        style={{
          ...cssVariables,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "2rem",
          backgroundColor: "#fff",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

// --- Stories ---

export const NovoProjeto = {
  args: {
    label: "Novo Projeto",
    image: images.folder,
    alt: "Pasta azul",
    variant: "primary",
  },
};

export const NovoBrainstorm = {
  args: {
    label: "Novo Brainstorm",
    image: images.lightBulb,
    alt: "Lâmpada acesa",
    variant: "secondary",
  },
};

export const Desabilitado = {
  args: {
    label: "Funcionalidade Bloqueada",
    image: images.folder,
    variant: "primary",
    disabled: true,
  },
};
