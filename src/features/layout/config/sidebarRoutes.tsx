import { SidebarRoute } from "src/ui/components/Sidebar/Sidebar.types.ts";
import { IconJournal, IconMatrix, IconUser } from "src/ui/assets/icons";

export const getSidebarRoutes = (): SidebarRoute[] => [
    {
        path: "/",
        name: "Ценовые матрицы",
        icon: <IconMatrix />,
    },
    {
        path: "/logs",
        name: "Журнал изменений",
        icon: <IconJournal />,
    },
    {
        path: "/users",
        name: "Доступы",
        icon: <IconUser />,
    },
];
