import styles from "./MatrixData.module.scss";
import { MatrixData as Matrix } from "src/features/matrix/pages/MatrixListPage.tsx";
import { observer } from "mobx-react-lite";
import { Card } from "src/ui/components/Card/Card.tsx";

interface MatrixDataProps {
    matrix: Matrix;
}

export const MatrixData = observer((props: MatrixDataProps) => {
    const { matrix } = props;

    return (
        <div className={styles.layout}>
            <div className={styles.column}>
                <Card title={"Основная информация"}>
                    <div className={styles.mainInfo}>
                        <div className={styles.mainInfoCol}>
                            <div className={styles.mainInfoColLabel}>
                                Тип матрицы
                            </div>
                            <div className={styles.mainInfoColValue}>
                                {matrix.type === "BASELINE" ? "Baseline" : "Discount"}
                            </div>
                        </div>
                        <div className={styles.mainInfoCol}>
                            <div className={styles.mainInfoColLabel}>
                                Дата создания
                            </div>
                            <div className={styles.mainInfoColValue}>
                                {new Date(matrix.createDate).toLocaleDateString()}
                            </div>
                        </div>
                        <div className={styles.mainInfoCol}>
                            <div className={styles.mainInfoColLabel}>
                                Количество цен
                            </div>
                            <div className={styles.mainInfoColValue}>
                                {matrix.priceCount ?? "-"}
                            </div>
                        </div>
                        <div className={styles.mainInfoCol}>
                            <div className={styles.mainInfoColLabel}>
                                Сегмент
                            </div>
                            <div className={styles.mainInfoColValue}>
                                {matrix.segmentId ?? "-"}
                            </div>
                        </div>
                    </div>
                </Card>
                <Card title={"Основная информация"}>
                    123
                </Card>
            </div>
            <div className={styles.column}>
                <Card title={"Фильтры"}>
                    123
                </Card>
            </div>
        </div>
    )
})