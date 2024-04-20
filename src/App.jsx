import { AlertProvider } from "./hooks/useAlert";
import { AuthProvider } from "./hooks/useAuth";
import Routes from "./routes";
export default function App() {
  return (
    <AuthProvider>
      <AlertProvider>
        <Routes />
      </AlertProvider>
    </AuthProvider>
  );
}
