import { Checkbox } from 'src/ui/components/Checkbox/Checkbox'
import styles from './styles.module.scss'
import { RadioButton } from 'src/ui/components/RadioButton/RadioButton'
import { Button } from 'src/ui/components/Button/Button'



interface MatrixItemProps {
    id: number
    name: string
    type: "BASELINE" | "DISCOUNT"
    status: "DRAFT" | "INACTIVE" | 'ACTIVE'
    priceCount: number | null
    segmentId?: number | null
    date: string
}
const checkStatus = (stat: string) => {
    if (stat === "DRAFT") return "Черновик"
    if (stat === "INACTIVE") return "Неактивно"
    if (stat === "ACTIVE") return "Активно"
    return stat


}
export const MatrixItem = ({ name, type, status, priceCount, segmentId, id, date }: MatrixItemProps) => {
    function formatDate(inputDate: string) {
        const dateObject = new Date(inputDate);

        const day = dateObject.getDate();
        const month = dateObject.getMonth() + 1; // Месяцы начинаются с 0
        const year = dateObject.getFullYear();

        const formattedDate = `${day}.${month < 10 ? '0' : ''}${month}.${year}`;

        return formattedDate;
    }
    function formatText(inputText: string) {
        if (!inputText) {
            return '';
        }

        const firstChar = inputText.charAt(0);
        const restOfText = inputText.slice(1).toLowerCase();

        return firstChar + restOfText;
    }
    return (
        <div className={styles.container}>
            <div className={styles.button}>{/* type === "BASELINE" ? */ <Checkbox checked={true} /> /* : <RadioButton value={true}  */}</div>
            <div className={styles.block}>
                <div className={styles.name}>{name}</div>
                <div className={styles.type}>{formatText(type)}</div>
                <div className={styles.date}>{formatDate(date)}</div>

                <div className={styles.status}>
                    <Button type='secondary' color={status === "ACTIVE" ? 'positive' : 'neutral'} size='small'>{checkStatus(status)}</Button>
                </div>
                <div className={styles.priceCount}>{priceCount === null ? "—" : priceCount}</div>

                <div className={styles.segmentId}>{segmentId === null ? "—" : segmentId}</div></div>


        </div>
    )
}
