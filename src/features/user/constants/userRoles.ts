import { UserRole } from "src/features/users/types/User.ts";

export const userRoles: Record<UserRole, string> = {
    ADMIN: "Администратор",
    USER: "Пользователь",
};
