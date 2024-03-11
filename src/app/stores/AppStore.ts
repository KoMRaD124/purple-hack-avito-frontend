import { MatrixStore } from "src/features/matrix/stores/MatrixStore";
import { UserStore } from "src/features/user/stores/UserStore.ts";

export const store = {
    user: new UserStore(),
    matrix: new MatrixStore()
};
