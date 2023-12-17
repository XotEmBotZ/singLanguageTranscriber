'use client'
import styles from '@/styles/components/trainLayout.module.css'
import Link from 'next/link'
import { AppShell, NavLink, Badge } from '@mantine/core'

export default function TrainLayout({ children }) {
    return (<>

        <AppShell.Navbar p="md">
            <h1 className={styles.asideHead}>Train Your Own Model</h1>
            <NavLink
                href="/train/data-collection"
                label="Data Collection"
                description="Collect data to train your model"
                leftSection={
                    <Badge size="xs" variant="filled" color="red" w={16} h={16} p={0}>
                        1
                    </Badge>
                }
                component={Link}
            />
            <NavLink
                href="/train/model-train"
                label="Model Training"
                description="Train your model with collected data"
                leftSection={
                    <Badge size="xs" variant="filled" color="red" w={16} h={16} p={0}>
                        2
                    </Badge>
                }
                component={Link}
            />
        </AppShell.Navbar>
        <section>
            {children}
        </section>
    </>)
}
