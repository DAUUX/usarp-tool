import { useAuth } from "../hooks/useAuth";
import { LoggedRoutes } from "./LoggedRoutes";
import { UnloggedRoutes } from "./UnloggedRoutes";
// import LoadingSpinner from "../components/ui/LoadingSpinner"; // Opcional: componente de loading

export default function Routes() {
const { signed, isLoading } = useAuth();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return signed ? <LoggedRoutes /> : <UnloggedRoutes />;
}
