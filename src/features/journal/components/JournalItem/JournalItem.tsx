import { Button } from 'src/ui/components/Button/Button';
import styles from './style.module.scss'
export const JournalItem = ({ action, name, date, status, author }: { action: string, name: string, date: string, status: string, author: string }) => {



    function formatDate(date: string) {
        const dateObject = new Date(date);
        const formattedDate = dateObject.toLocaleDateString()
        return formattedDate;
    }
    function formatTime(date: string) {
        const dateObject = new Date(date);
        const formattedDate = dateObject.toLocaleTimeString()
        return formattedDate;
    }

    const checkStatus = (stat: string) => {
        if (stat === "ACTIVE") return <Button size='small' type='secondary' color='positive'>Активно</Button>
        if (stat === "DRAFT") return <Button size='small' type='secondary' color='neutral'>Черновик</Button>
        if (stat === "INACTIVE") return <Button size='small' type='secondary' color='neutral'>Черновик</Button>
        return stat


    }
    return (
        <div className={styles.sortlist}>
            <div className={styles.sortlistAction}>
                {action}
            </div>
            <div className={styles.sortlistName}>
                {name}
            </div>
            <div className={styles.sortlistDate}>
                {formatDate(date)}
            </div>
            <div className={styles.sortlistTime}>
                {formatTime(date)}
            </div>
            <div className={styles.sortlistStatus}>
                {checkStatus(status)}
            </div>
            <div className={styles.sortlistAuthor}>
                {author}
            </div>
        </div>
    )
}
