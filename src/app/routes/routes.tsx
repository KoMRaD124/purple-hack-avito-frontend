import { RouteObject } from "react-router-dom";

import { AppRoot } from "src/app/components/AppRoot.tsx";
import AdminPageRoot from "src/features/layout/components/AdminPageRoot/AdminPageRoot.tsx";
import { LoginPage } from "src/ui/components/LoginPage/LoginPage";
/* import { HomePage } from "src/features/home/pages/HomePage.tsx";
 */import { MatrixListPage } from "src/features/matrix/pages/MatrixListPage";
import { MatrixViewPage } from "src/features/matrixdata/pages/MatrixViewPage.tsx";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <AppRoot />,
        children: [
            {
                path: "/auth/login",
                element: <LoginPage />,
            },
            {
                path: "/",
                element: <AdminPageRoot />,
                children: [
                    {
                        path: "/",
                        element: <MatrixListPage />,
                    },
                    {
                        path: "/matrix/:id/view",
                        element: <MatrixViewPage />,
                    },
                ],
            },
        ],
    },
];
