import styles from "./Header.module.scss";
import { ReactNode } from "react";

export interface HeaderProps {
    title: string;
    notification?: ReactNode;
    avatar?: ReactNode;
    actions?: ReactNode[];
}

export const Header = (props: HeaderProps) => {
    const { title, notification, avatar, actions }: HeaderProps = props;

    return (
        <div className={styles.header}>
            <div className={styles.titleRow}>
                <div className={styles.title}>{title}</div>
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
