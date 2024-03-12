import { Input } from "src/ui/components/Input/Input"
import styles from "./styles.module.scss"
import { ChangeEvent, useState } from "react"
import { RadioGroup } from "src/ui/components/RadioGroup/RadioGroup"
import { RadioButton } from "src/ui/components/RadioButton/RadioButton"
import { ButtonIcon } from "src/ui/components/ButtonIcon/ButtonIcon"
import { IconArrowDown } from "src/ui/assets/icons"
import { DropdownList } from "src/ui/components/DropdownList/DropdownList"
import { store } from "src/app/stores/AppStore"
import { observer } from "mobx-react-lite"
import { DropdownListOption } from "src/ui/components/DropdownList/DropdownList.types"
import { Button } from "src/ui/components/Button/Button"



export const CreateMatrix = observer(({ onClose }: { onClose: () => void }) => {
    const [nameValue, setNameValue] = useState("")
    const [segmentId, setSegmentId] = useState<number | undefined>(0)
    const [segmentName, setSegmentName] = useState("")

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>,): void => {
        setNameValue(event.target.value);
    };
    const handleInputChangeSegment = (event: ChangeEvent<HTMLInputElement>,): void => {
        setSegmentName(event.target.value);
        setSegmentId
    };
    const [radioValue, setRadioValue] = useState("BASELINE")


    const segments = store.matrix.segment.map((number) => ({
        name: `Сегмент-${number}`,
        value: number,
    }));
    const onChange = (option: DropdownListOption) => {
        setSegmentName(option.name)
        setSegmentId(option.value)
    };
    const filtredSegments = segments.filter((item) =>
        item.name.toLowerCase().includes(segmentName.toLowerCase())
    )
   
    console.log(segmentId)
    return (
        <div className={styles.container}>
            <div className={styles.header}>Новая матрица</div>
            <div className={styles.nameInput}>
                <Input value={nameValue} formName="Название" onChange={handleInputChange} placeholder="Название матрицы" />
            </div>
            <div className={styles.matrixType}>
                <div className={styles.matrixTypeHead}>Тип матрицы</div>
                <div className={styles.radioGroup}>
                    <RadioGroup onChange={setRadioValue} value={radioValue}>
                        <RadioButton title="Baseline" value="BASELINE" />
                        <RadioButton title="Discount" value="DISCOUNT" />
                    </RadioGroup></div>
            </div>
            {radioValue === "DISCOUNT" && <div className={styles.segmetType}>
                <DropdownList options={filtredSegments} onChange={onChange} width={320}  >
                    <Input formName="Сегмент"
                        placeholder="Номер сегмента"
                        value={segmentName}
                        onChange={handleInputChangeSegment}
                        endIcon={<ButtonIcon color='neutral'>
                            <IconArrowDown />
                        </ButtonIcon>}
                    />
                </DropdownList>
            </div>}
            <div className={styles.buttonBlock}>
                <Button>Далее</Button>
                <Button onClick={onClose}>Отмена</Button>

            </div>
        </div>
    )
});
