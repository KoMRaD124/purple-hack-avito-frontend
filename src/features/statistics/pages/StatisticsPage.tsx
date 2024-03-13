import { observer } from 'mobx-react-lite'
import { AdminPageLayout } from 'src/features/layout/components/AdminPageLayout/AdminPageLayout';
import styles from "./styles.module.scss"
import { useState } from 'react';
import { Button } from 'src/ui/components/Button/Button';
import { Checkbox } from 'src/ui/components/Checkbox/Checkbox';
import { DropdownList } from 'src/ui/components/DropdownList/DropdownList';
import { store } from 'src/app/stores/AppStore';
import { Input } from 'src/ui/components/Input/Input';
import { ButtonIcon } from 'src/ui/components/ButtonIcon/ButtonIcon';
import { IconArrowDown, IconClear } from 'src/ui/assets/icons';
import { BarChart } from '@mui/x-charts/BarChart';

export const StatisticsPage = observer(() => {
    const [activeSort, setActiveSort] = useState("all")
    const [isCheckedCount, setisCheckedCount] = useState(false)
    const [selectTimePeriod, setSelectTimePeriod] = useState("Временной период")
    const timeArray = [
        { name: "День", value: "day" },
        { name: "Неделя", value: "week" },
        { name: "Месяц", value: "month" },
        { name: "Год", value: "year" },
        { name: "Всё время", value: "all" }
    ]
    const [activeCategory, setActiveCategory] = useState("category")
    return (
        <AdminPageLayout title='Статистика' actions={[
            <Button key={"clone"}>Сформировать отчет</Button>,
            <Button key={"logs"} type={"secondary"}>
                Готовые отчёты
            </Button>,
        ]}>
            <div className={styles.buttonsContainer}>
                <Button onClick={() => setActiveSort("all")} color='neutral' type={activeSort === "all" ? "primary" : "tertiary"}>Все</Button>
                <Button onClick={() => setActiveSort("salesCount")} color='neutral' type={activeSort === "salesCount" ? "primary" : "tertiary"}>Количество продаж</Button>
                <Button onClick={() => setActiveSort("avgPrice")} color='neutral' type={activeSort === "avgPrice" ? "primary" : "tertiary"}>Средняя цена</Button>
                <Button onClick={() => setActiveSort("countAD")} color='neutral' type={activeSort === "countAD" ? "primary" : "tertiary"}>Количество объявлений</Button>
                <Button onClick={() => setActiveSort("conversion")} color='neutral' type={activeSort === "conversion" ? "primary" : "tertiary"}>Конверсия</Button>

            </div>
            <div className={styles.statisticContainer}>
                <div className={styles.statisticHeader}>
                    <div className={styles.statisticHeaderCheckbox}><Checkbox color='accent' checked={isCheckedCount} onChange={setisCheckedCount} /> Количество продаж</div>
                    <div className={styles.inputSearch}>
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
                        </DropdownList></div>
                    <div className={styles.buttonTime}>
                        <DropdownList options={timeArray} onChange={(option) => setSelectTimePeriod(option.name)}><Button endIcon={<IconArrowDown />} type='outlined'>
                            {selectTimePeriod}
                        </Button>
                        </DropdownList>

                    </div>


                </div>
                <div className={styles.statisticBody}>
                    <div className={styles.statisticBodyleft}>
                        {/*  <BarChart

                            xAxis={[{ scaleType: 'band', data: ['Продажи'] }]}
                            series={[{ data: [10234] }, { data: [43343] }, { data: [15288] }, { data: [34745] }, { data: [25745] }, { data: [15745] }, { data: [25745] }, { data: [55745] }, { data: [8745] }, { data: [22745] }]}
                            colors={['#FFB35D', '#FFB35D', '#603D1B', '#FFE898', '#C1A13C', '#5D641E', '#BAD0C4', '#7CAED1', '#98D3F1', '#94D0B3']}
                            width={521}
                            height={198}

                        /> */}
                        <div className={styles.buttonblock}>
                            <Button onClick={() => setActiveCategory("category")} type={activeCategory === 'category' ? 'primary' : 'tertiary'} color={activeCategory === 'category' ? 'accent' : 'neutral'}>Категории</Button>
                            <Button onClick={() => setActiveCategory("service")} type={activeCategory === 'service' ? 'primary' : 'tertiary'} color={activeCategory === 'service' ? 'accent' : 'neutral'}>Платные услуги</Button>
                        </div>
                        <div className={styles.grafik}>
                            <BarChart
                                width={521}
                                height={198}
                                series={[{
                                    data: [27452, 41837, 36784, 17599, 36123, 14125, 47156, 31495, 43322, 28573],
                                }]}

                                xAxis={
                                    [
                                        { data: ["Транспорт", "Недвижимость", "Работа", "Личные вещи", "Для дома и дачи", "Электроника", "Хобби и отдых", "Животные", "Готовый бизнес и оборудование", "Услуги"], scaleType: 'band' }
                                    ]
                                }
                                colors={['black', '#FFB35D', '#603D1B']}
                                className='MuiBarElement-root'
                            />
                        </div>

                    </div>
                    <div className={styles.statisticBodyright}>
                        <div className={styles.categoryList}>
                            <div className={styles.categoryListItem}>
                                <div className={styles.squere}></div>
                                <div className={styles.itemText}>Транспорт</div>
                                <div className={styles.itemCount}>27452</div>
                            </div>
                            <div className={styles.categoryListItem}>
                                <div className={styles.squere}></div>
                                <div className={styles.itemText}>Недвижимость</div>
                                <div className={styles.itemCount}>41837</div>
                            </div>
                            <div className={styles.categoryListItem}>
                                <div className={styles.squere}></div>
                                <div className={styles.itemText}>Работа</div>
                                <div className={styles.itemCount}>36784</div>
                            </div>
                            <div className={styles.categoryListItem}>
                                <div className={styles.squere}></div>
                                <div className={styles.itemText}>Личные вещи</div>
                                <div className={styles.itemCount}>17599</div>
                            </div>
                            <div className={styles.categoryListItem}>
                                <div className={styles.squere}></div>
                                <div className={styles.itemText}>Для дома и дачи</div>
                                <div className={styles.itemCount}>36123</div>
                            </div>
                            <div className={styles.categoryListItem}>
                                <div className={styles.squere}></div>
                                <div className={styles.itemText}>Электроника</div>
                                <div className={styles.itemCount}>14125</div>
                            </div>
                            <div className={styles.categoryListItem}>
                                <div className={styles.squere}></div>
                                <div className={styles.itemText}>Хобби и отдых</div>
                                <div className={styles.itemCount}>count</div>
                            </div>
                            <div className={styles.categoryListItem}>
                                <div className={styles.squere}></div>
                                <div className={styles.itemText}>Животные</div>
                                <div className={styles.itemCount}>count</div>
                            </div>
                            <div className={styles.categoryListItem}>
                                <div className={styles.squere}></div>
                                <div className={styles.itemText}>Готовый бизнес и обор...</div>
                                <div className={styles.itemCount}>count</div>
                            </div>
                            <div className={styles.categoryListItem}>
                                <div className={styles.squere}></div>
                                <div className={styles.itemText}>Услуги</div>
                                <div className={styles.itemCount}>count</div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </AdminPageLayout>
    )
});
