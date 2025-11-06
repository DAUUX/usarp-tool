import { useAuth } from "../hooks/useAuth";
import { LoggedRoutes } from "./LoggedRoutes";
import { UnloggedRoutes } from "./UnloggedRoutes";

export default function Routes() {
  const { signed } = useAuth();
  //return signed ? <LoggedRoutes /> : <UnloggedRoutes />;
  return <LoggedRoutes />;
}
