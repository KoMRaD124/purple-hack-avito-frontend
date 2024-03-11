import { MatrixStore } from "src/features/matrix/stores/MatrixStore";
import { UserStore } from "src/features/user/stores/UserStore.ts";
import { MatrixDataStore } from "src/features/matrixdata/stores/MatrixDataStore.tsx";

export const store = {
    user: new UserStore(),
    matrix: new MatrixStore(),
    matrixData: new MatrixDataStore(),
};
