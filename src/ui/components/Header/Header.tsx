import styles from "./Header.module.scss";
import { ReactNode } from "react";

export interface HeaderProps {
    title: string;
    titleChip?: ReactNode;
    notification?: ReactNode;
    avatar?: ReactNode;
    actions?: ReactNode[];
}

export const Header = (props: HeaderProps) => {
    const { title, notification, avatar, actions, titleChip }: HeaderProps = props;

    return (
        <div className={styles.header}>
            <div className={styles.titleRow}>
                <div className={styles.title}>
                    {title}
                    {titleChip}
                </div>
                <div className={styles.titleRowActions}>
                    {notification}
                    {avatar}
                </div>
            </div>
            {!!actions?.length && (
                <div className={styles.actionsRow}>
                    {actions?.map((action, index) => <div key={index}>{action}</div>)}
                </div>
            )}
        </div>
    );
};
