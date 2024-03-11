import styles from "./Card.module.scss";
import { ReactNode } from "react";
import { clsx } from "clsx";

export interface CardProps {
    children: ReactNode;
    title?: ReactNode;
    helpIcon?: ReactNode;
}

export const Card = (props: CardProps) => {
    const { children, title, helpIcon }: CardProps = props;
    return (
        <div className={styles.card}>
            {title && (
                <div className={clsx(styles.header, styles.content)}>
                    <div className={styles.title}>
                        {title}
                        {helpIcon}
                    </div>
                </div>
            )}
            <div className={styles.content}>{children}</div>
        </div>
    );
};
