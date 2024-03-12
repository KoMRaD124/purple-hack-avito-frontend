import { observer } from "mobx-react-lite";
import { AdminPageLayout } from "src/features/layout/components/AdminPageLayout/AdminPageLayout.tsx";
import { useParams } from "react-router-dom";
import { store } from "src/app/stores/AppStore.ts";
import { useEffect } from "react";
import { Button } from "src/ui/components/Button/Button.tsx";
import { MatrixData } from "src/features/matrixdata/components/MatrixData/MatrixData.tsx";
import { ICategory } from "src/features/matrixdata/stores/MatrixDataStore.tsx";

export const MatrixViewPage = observer(() => {
    const params = useParams<{ id: string }>();
    const matrix = store.matrix.allMatrix.find((elem) => elem.id.toString() === params.id);

    useEffect(() => {
        if (!store.matrix.allMatrix.length) {
            store.matrix.getMatrix();
        }
        if (!store.matrix.category.length) {
            store.matrix.getCategory();
        }
        if (!store.matrix.location.length) {
            store.matrix.getLocation();
        }
    }, []);

    return (
        <AdminPageLayout
            title={matrix?.name ?? "Загрузка..."}
            titleChip={
                <Button type={"secondary"} color={"positive"} clickable={false}>
                    Активно
                </Button>
            }
            actions={[
                <Button key={"clone"}>Создать копию и редактировать</Button>,
                <Button key={"logs"} type={"tertiary"}>
                    Журнал изменений
                </Button>,
            ]}
        >
            {matrix ? <MatrixData matrix={matrix} /> : "Загрузка..."}
        </AdminPageLayout>
    );
});
