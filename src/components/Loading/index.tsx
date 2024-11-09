// components/Loading/index.tsx
import styles from './loading.module.css';

export default function Loading() {
    return (
        <div className={styles.container}>
            <div className={styles.spinner}>
                <div className={styles.ball}></div>
                <div className={styles.ball}></div>
                <div className={styles.ball}></div>
                <div className={styles.ball}></div>
                <div className={styles.ball}></div>
                <div className={styles.ball}></div>
                <div className={styles.ball}></div>
                <div className={styles.ball}></div>
            </div>
        </div>
    );
}
