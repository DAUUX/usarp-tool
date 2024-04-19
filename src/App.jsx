import { AlertProvider } from "./hooks/useAlert";
import AppRoutes from "./routes";
export default function App() {
  return (
    <AlertProvider>
      <AppRoutes />
    </AlertProvider>
  );
}
