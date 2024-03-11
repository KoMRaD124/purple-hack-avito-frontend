import styles from "./MatrixData.module.scss";
import { MatrixData as Matrix } from "src/features/matrix/pages/MatrixListPage.tsx";
import { observer } from "mobx-react-lite";
import { Card } from "src/ui/components/Card/Card.tsx";
import { Input } from "src/ui/components/Input/Input.tsx";
import { ButtonIcon } from "src/ui/components/ButtonIcon/ButtonIcon.tsx";
import { IconClear } from "src/ui/assets/icons";
import { store } from "src/app/stores/AppStore.ts";
import { Button } from "src/ui/components/Button/Button.tsx";
import { DropdownList } from "src/ui/components/DropdownList/DropdownList.tsx";

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
                            <div className={styles.mainInfoColLabel}>Тип матрицы</div>
                            <div className={styles.mainInfoColValue}>
                                {matrix.type === "BASELINE" ? "Baseline" : "Discount"}
                            </div>
                        </div>
                        <div className={styles.mainInfoCol}>
                            <div className={styles.mainInfoColLabel}>Дата создания</div>
                            <div className={styles.mainInfoColValue}>
                                {new Date(matrix.createDate).toLocaleDateString()}
                            </div>
                        </div>
                        <div className={styles.mainInfoCol}>
                            <div className={styles.mainInfoColLabel}>Количество цен</div>
                            <div className={styles.mainInfoColValue}>
                                {matrix.priceCount ?? "-"}
                            </div>
                        </div>
                        <div className={styles.mainInfoCol}>
                            <div className={styles.mainInfoColLabel}>Сегмент</div>
                            <div className={styles.mainInfoColValue}>{matrix.segmentId ?? "-"}</div>
                        </div>
                    </div>
                </Card>
                <Card
                    title={
                        <div className={styles.buttonList}>
                            <Button
                                color={"neutral"}
                                type={store.matrixData.filter === "all" ? "primary" : "tertiary"}
                                onClick={() => (store.matrixData.filter = "all")}
                            >
                                Все
                            </Button>
                            <Button
                                color={"neutral"}
                                type={
                                    store.matrixData.filter === "withPrice" ? "primary" : "tertiary"
                                }
                                onClick={() => (store.matrixData.filter = "withPrice")}
                            >
                                Задана цена
                            </Button>
                            <div className={styles.divider} />
                        </div>
                    }
                >
                    123
                </Card>
            </div>
            <div className={styles.column}>
                <Card title={"Фильтры"}>
                    <div className={styles.filters}>
                        <DropdownList
                            value={store.matrixData.category}
                            options={store.matrixData.categoryInputValues}
                            color={"neutral"}
                            fullWidth={true}
                            onChange={(option) => {
                                store.matrixData.category = option.value as any;
                                store.matrixData.categorySearch = option.name;
                            }}
                        >
                            <Input
                                placeholder={"Название категории или подкатегории"}
                                onChange={(event) =>
                                    store.matrixData.setCategorySearch(event.target.value)
                                }
                                value={store.matrixData.categorySearch}
                                formName={"Выбрать категорию"}
                                formText={"Отображается 500 000 категорий"}
                                size={"small"}
                                endIcon={
                                    store.matrixData.categorySearch.length > 0 && (
                                        <ButtonIcon
                                            pale={true}
                                            type="tertiary"
                                            color="neutral"
                                            onClick={() => store.matrixData.setCategorySearch("")}
                                        >
                                            <IconClear />
                                        </ButtonIcon>
                                    )
                                }
                                onBlur={() =>
                                    setTimeout(() =>
                                        store.matrixData.setCategorySearch(
                                            store.matrixData.category?.name ?? "",
                                        ), 100
                                    )
                                }
                            />
                        </DropdownList>

                        <DropdownList
                            value={store.matrixData.location}
                            options={store.matrixData.locationInputValues}
                            color={"neutral"}
                            fullWidth={true}
                            onChange={(option) => {
                                store.matrixData.location = option.value as any;
                                store.matrixData.locationSearch = option.name;
                            }}
                        >
                            <Input
                                placeholder={"Область или город"}
                                onChange={(event) =>
                                    store.matrixData.setLocationSearch(event.target.value)
                                }
                                value={store.matrixData.locationSearch}
                                formName={"Выбрать локацию"}
                                formText={"Отображается 300 зон локаций"}
                                size={"small"}
                                endIcon={
                                    store.matrixData.locationSearch.length > 0 && (
                                        <ButtonIcon
                                            pale={true}
                                            type="tertiary"
                                            color="neutral"
                                            onClick={() => store.matrixData.setLocationSearch("")}
                                        >
                                            <IconClear />
                                        </ButtonIcon>
                                    )
                                }
                                onBlur={() =>
                                    setTimeout(() =>
                                        store.matrixData.setLocationSearch(
                                            store.matrixData.location?.name ?? "",
                                        ), 100
                                    )
                                }
                            />
                        </DropdownList>
                    </div>
                </Card>
            </div>
        </div>
    );
});
