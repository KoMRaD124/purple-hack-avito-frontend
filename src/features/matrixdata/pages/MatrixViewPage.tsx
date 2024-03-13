import { observer } from "mobx-react-lite";
import { AdminPageLayout } from "src/features/layout/components/AdminPageLayout/AdminPageLayout.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { store } from "src/app/stores/AppStore.ts";
import { useEffect, useState } from "react";
import { Button } from "src/ui/components/Button/Button.tsx";
import { MatrixData } from "src/features/matrixdata/components/MatrixData/MatrixData.tsx";
import { IconBasket } from "src/ui/assets/icons";
import Modal from "@mui/material/Modal";
import { CloneMatrix } from "src/features/matrixdata/components/CloneMatrix/CloneMatrix.tsx";
import {
    SaveMatrixDataSuccesfull
} from "src/features/matrixdata/components/SaveMatrixDataSuccesfull/SaveMatrixDataSuccesfull.tsx";

export const MatrixViewPage = observer(() => {
    const params = useParams<{ id: string }>();
    const matrix = store.matrix.allMatrix.find((elem) => elem.id.toString() === params.id);
    const navigate = useNavigate();
    const [openClone, setOpenClone] = useState(false);
    const [openSuccessful, setOpenSuccessful] = useState(false);

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
        if (!store.matrix.segment.length) {
            store.matrix.getSegment();
        }
    }, []);

    if (!matrix) {
        return <AdminPageLayout title={"Загрузка..."}>Загрузка...</AdminPageLayout>;
    }

    const getTitleChip = () => (
        <Button
            type={"secondary"}
            color={
                {
                    ACTIVE: "positive",
                    INACTIVE: "neutral",
                    DRAFT: "neutral"
                }[matrix.status] as any
            }
            clickable={false}
        >
            {
                {
                    ACTIVE: "Активно",
                    INACTIVE: "Неактивно",
                    DRAFT: "Черновик"
                }[matrix.status]
            }
        </Button>
    );

    const getActions = () => {
        const actions = [];
        if (matrix.status === "ACTIVE" || matrix.status === "INACTIVE") {
            actions.push(
                <Button key={"clone"} onClick={() => setOpenClone(true)}>
                    Создать копию и редактировать
                </Button>,
                <Button key={"logs"} type={"tertiary"} onClick={() => navigate("/logs")}>
                    Журнал изменений
                </Button>
            );
        } else {
            actions.push(
                <Button
                    key={"setPrice"}
                    type={"secondary"}
                    disabled={!store.matrixData.selectedMatrixData.length}
                >
                    Задать цену
                </Button>,
                <Button
                    key={"deletePrice"}
                    type={"secondary"}
                    color={"negative"}
                    startIcon={<IconBasket />}
                    disabled={!store.matrixData.selectedMatrixData.length}
                >
                    Удалить цену
                </Button>,
                <Button key={"save"} style={{ marginLeft: "auto" }} onClick={() => {
                    store.matrixData.saveMatrixData();
                    setOpenSuccessful(true);
                }}>
                    Сохранить
                </Button>
            );
        }
        return actions;
    };

    return (
        <AdminPageLayout
            title={matrix?.name ?? "Загрузка..."}
            titleChip={getTitleChip()}
            actions={getActions()}
            onBack={() => navigate("/")}
        >
            {matrix ? <MatrixData matrix={matrix} /> : "Загрузка..."}
            <Modal open={openClone}>
                <CloneMatrix onClose={() => setOpenClone(false)} matrix={matrix} />
            </Modal>
            <Modal open={openSuccessful}>
                <SaveMatrixDataSuccesfull onClick={() => setOpenSuccessful(false)} />
            </Modal>
        </AdminPageLayout>
    );
});
