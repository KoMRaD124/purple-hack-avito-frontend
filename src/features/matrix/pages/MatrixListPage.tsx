import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { AdminPageLayout } from "src/features/layout/components/AdminPageLayout/AdminPageLayout.tsx";
import styles from "./styles.module.scss"
import { Input } from "src/ui/components/Input/Input";
import { IconClear, IconPlay, IconPlus, IconQuestion, IconSearch, IconSort } from "src/ui/assets/icons";
import { ButtonIcon } from "src/ui/components/ButtonIcon/ButtonIcon";
import { Button } from "src/ui/components/Button/Button";
import { Popover } from "src/ui/components/Popover/Popover";
import { MatrixItem } from "../components/MatrixItem/MatrixItem";
import axios from "axios";
import { GET_ALL_MATRIX } from "src/shared/api/endpoints";

interface MatrixData {
    segmentId: number | null;
    createDate: string;
    priceCount: number | null;
    id: number;
    name: string;
    type: string;
    status: string;
}
export const MatrixListPage = observer(() => {
    useState
    const [searchValue, setSearchValue] = useState("")
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setSearchValue(event.target.value);
    };
    const [activeButton, setActiveButton] = useState<string>("all")
    const [sortButton, setSortButton] = useState<string>("date")
    const [sortTypeButton, setSortTypeButton] = useState(false)

    const OnClickTypeButton = (type: string) => {

        if (type === sortButton) {
            setSortTypeButton(!sortTypeButton)
        }
        else {
            setSortButton(type)
            setSortTypeButton(false)
        }
    }
    console.log((sortTypeButton && sortButton === "type"))
    const [data, setDate] = useState<MatrixData[]>([])
    useEffect(() => {
        axios
            .get(GET_ALL_MATRIX)
            .then((response) => {
                console.log(response.data)
                setDate(response.data);

            })
            .catch((error: string) => {
                console.log(error)
            });
    }, [])
    const filteredResults = data.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    const filteredSecontTimeResults = filteredResults.filter((item) => {
        switch (activeButton) {
            case "active":
                return item.status === "ACTIVE";
            case "all":
                return true;
            case "baseline":
                return item.type === "BASELINE";
            case "discount":
                return item.type === "DISCOUNT";

            default:
                return true;
        }
    });
    const sortedResults = filteredSecontTimeResults.sort((a, b) => {
        const sortProperty = sortButton as keyof MatrixData;
        
        // Уточняем типы явно(люблю это делать шо ппц)
        const aValue: string | number | null = a[sortProperty];
        const bValue: string | number | null = b[sortProperty];
    
        if (aValue === null || bValue === null) {
            return 0; // или другое значение, в зависимост
        }
    
        return sortTypeButton
            ? bValue > aValue ? 1 : bValue < aValue ? -1 : 0
            : aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    });

    const matrixArray = sortedResults.map((item) => {
        return <MatrixItem
            segmentId={item.segmentId}
            date={item.createDate}
            priceCount={item.priceCount}
            key={item.id + item.name}
            id={item.id}
            name={item.name}
            type={item.type}
            status={item.status}
        />;
    });

    return (
        <AdminPageLayout title={"Ценовые матрицы"}>
            <div className={styles.container}>
                <div className={styles.searchContent}>
                    <div className={styles.inputContainer}>
                        <Input
                            value={searchValue}
                            onChange={handleInputChange}
                            placeholder="Название матрицы"
                            startIcon={<IconSearch />}
                            endIcon={
                                searchValue.length > 0 && <ButtonIcon
                                    pale={true}
                                    type="tertiary"
                                    color="neutral"
                                    onClick={() => setSearchValue("")}><IconClear /></ButtonIcon>
                            } />
                    </div>
                    <div className={styles.buttonAddContainer}>
                        <Button size="large">Применить изменения</Button>
                        <Popover
                            header={"ХедерХедерХедер"}
                            text={"ХедерХедерХедерХедерХедер"}
                            color='neutral'
                            arrowAlign='end'
                        >

                            <ButtonIcon type="tertiary"
                                color="neutral">
                                <IconQuestion />
                            </ButtonIcon>

                        </Popover>
                    </div>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.buttonContainer}>
                    <div className={styles.buttonlist}>
                        <Button onClick={() => setActiveButton("active")} type={activeButton === "active" ? 'primary' : "tertiary"} color="positive" startIcon={<IconPlay />}>Активные</Button>
                        <Button onClick={() => setActiveButton("all")} type={activeButton === "all" ? 'primary' : "tertiary"} color="neutral" >Все</Button>
                        <Button onClick={() => setActiveButton("baseline")} type={activeButton === "baseline" ? 'primary' : "tertiary"} color="neutral">Baseline</Button>
                        <Button onClick={() => setActiveButton("discount")} type={activeButton === "discount" ? 'primary' : "tertiary"} color="neutral">Discount</Button>
                    </div>
                    <div className={styles.createButton}> <Button startIcon={<IconPlus />} type="secondary">Создать новую матрицу</Button></div>
                </div>
                <div className={styles.matrixSort}>
                    <div className={styles.sortName}>Название</div>

                    <div className={styles.sortType}>
                        <Button onClick={() => OnClickTypeButton("type")}
                            size='small'
                            pale={(sortButton === "type") ? false : true}
                            color='neutral'
                            type='tertiary'
                            endIcon={<IconSort style={{ transform: (sortTypeButton && sortButton === "type") ? "rotate(180deg)" : "rotate(0deg)" }} />}>Тип</Button>
                    </div>
                    <div className={styles.sortDate}>
                        <Button
                            size='small'
                            onClick={() => OnClickTypeButton("date")}
                            pale={(sortButton === "date") ? false : true}
                            color='neutral'
                            type='tertiary'
                            endIcon={<IconSort style={{ transform: (sortTypeButton && sortButton === "date") ? "rotate(180deg)" : "rotate(0deg)" }} />}>
                            Дата создания
                        </Button>
                    </div>
                    <div className={styles.sortStatus}>
                        <Button onClick={() => OnClickTypeButton("status")} size='small' pale={(sortButton === "status") ? false : true} color='neutral' type='tertiary' endIcon={<IconSort style={{ transform: (sortTypeButton && sortButton === "status") ? "rotate(180deg)" : "rotate(0deg)" }} />}>Статус</Button></div>
                    <div className={styles.sortCount}>
                        <Button onClick={() => OnClickTypeButton("count")} size='small' pale={(sortButton === "count") ? false : true} color='neutral' type='tertiary' endIcon={<IconSort style={{ transform: (sortTypeButton && sortButton === "count") ? "rotate(180deg)" : "rotate(0deg)" }} />}>Кол-во цен</Button></div>
                    <div className={styles.sortSegment}>
                        Сегмент</div>
                </div>
                <div className={styles.matrixList}>

                    {matrixArray.length > 0 ? matrixArray : <div className={styles.nf}>Ничего не найдено!</div>}


                </div>
            </div>
        </AdminPageLayout >
    );
});
