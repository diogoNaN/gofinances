import { AppRoutesParamList } from "../../routes/app.routes";
import { AuthRoutesParamList } from "../../routes/auth.routes";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AuthRoutesParamList, AppRoutesParamList {}
  }
}
