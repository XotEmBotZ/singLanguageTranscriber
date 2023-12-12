'use client'
import styles from '@/styles/components/trainLayout.module.css'
import Link from 'next/link'

export default function TrainLayout({ children }) {
    return (<>
        <section className={styles.mainSection}>
            <aside>
                <h1 className={styles.asideHead}>Train Your Own Model</h1>
                <Link className={styles.asideLink} href="data-collection">Data Collection</Link>
                <Link className={styles.asideLink} href="model-train">Train Model</Link>
            </aside>
            <section>
                {children}
            </section>
        </section>
    </>)
}
