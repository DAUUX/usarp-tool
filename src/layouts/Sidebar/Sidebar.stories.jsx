import { MemoryRouter } from "react-router-dom";
import Sidebar from "./Sidebar";

export default {
  title: "Layouts/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div style={{ height: "100vh", display: "flex", backgroundColor: "#f5f5f5" }}>
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => <Sidebar {...args} />;

export const HomeActive = Template.bind({});
HomeActive.decorators = [
  (Story) => (
    <MemoryRouter initialEntries={["/home"]}>
      <Story />
    </MemoryRouter>
  ),
];

export const ProjectsActive = Template.bind({});
ProjectsActive.decorators = [
  (Story) => (
    <MemoryRouter initialEntries={["/project"]}>
      <Story />
    </MemoryRouter>
  ),
];

export const BrainstormingActive = Template.bind({});
BrainstormingActive.decorators = [
  (Story) => (
    <MemoryRouter initialEntries={["/brainstorming"]}>
      <Story />
    </MemoryRouter>
  ),
];
