import { AuthRoutes } from "../auth/Routes/auth-routes";
import { MainRoutes } from "../main/Routes/main-routes";

export const Routing = {
    auth: {
        module: 'auth',
        children: AuthRoutes
    },
    main: {
        module: 'main',
        children: MainRoutes
    },
}