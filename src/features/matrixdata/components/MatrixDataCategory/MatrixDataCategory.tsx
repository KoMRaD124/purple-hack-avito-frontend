import styles from "./MatrixDataCategory.module.scss";
import { observer } from "mobx-react-lite";
import { ICategory } from "src/features/matrixdata/stores/MatrixDataStore.tsx";
import { Button } from "src/ui/components/Button/Button.tsx";
import { useState } from "react";
import { IconArrowDown, IconArrowRight } from "src/ui/assets/icons";
import { Counter } from "src/ui/components/Counter/Counter.tsx";
import { MatrixData as Matrix } from "src/features/matrix/pages/MatrixListPage";
import { store } from "src/app/stores/AppStore.ts";
import { clsx } from "clsx";
import { Checkbox } from "src/ui/components/Checkbox/Checkbox.tsx";

interface MatrixDataCategoryProps {
    matrix: Matrix;
    category: ICategory;
    root?: boolean;
}

export const MatrixDataCategory = observer((props: MatrixDataCategoryProps) => {
    const [expanded, setExpanded] = useState(false);

    const allLocationIds = [
        store.matrixData.getRootLocation(),
        ...store.matrixData.getLocations(),
    ].filter(Boolean).map((l) => l.id);

    if (!props.category) {
        return null;
    }

    return (
        <div className={clsx(styles.card, { [styles.root]: props.root })}>
            <div className={styles.header}>
                <Button
                    type={"tertiary"}
                    color={"neutral"}
                    onClick={() => setExpanded(!expanded)}
                    endIcon={expanded ? <IconArrowRight /> : <IconArrowDown />}
                >
                    {props.category.name}
                </Button>
                {props.matrix.priceCount && (
                    <div className={styles.headerRight}>
                        Задано цен
                        <Counter
                            value={
                                store.matrixData.matrixData.filter(
                                    (d) =>
                                        props.category.id === d.categoryId &&
                                        allLocationIds.includes(d.locationId),
                                ).length
                            }
                            color={"neutral"}
                        />
                    </div>
                )}
            </div>
            {expanded && (
                <div className={styles.content}>
                    <div className={styles.rootLocationRow}>
                        <Checkbox
                            onChange={() => {}}
                            title={store.matrixData.getRootLocation().name}
                            disabled={props.matrix.status !== "DRAFT"}
                        />
                    </div>
                    <div className={styles.childLocations}>
                        {store.matrixData.getLocations().map((location) => (
                            <div className={styles.childLocationRow} key={location.id}>
                                <Checkbox
                                    onChange={() => {}}
                                    title={location.name}
                                    disabled={props.matrix.status !== "DRAFT"}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
});
