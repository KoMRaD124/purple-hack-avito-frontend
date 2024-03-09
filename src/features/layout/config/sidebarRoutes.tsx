import { SidebarRoute } from "src/ui/components/Sidebar/Sidebar.types.ts";
import { IconHome } from "src/ui/assets/icons";

export const getSidebarRoutes = (): SidebarRoute[] => [
    {
        path: "/",
        name: "Главная",
        icon: <IconHome/>,
    },
];
