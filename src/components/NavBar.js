import React from 'react'
import styles from '@/styles/components/navBar.module.css'
import Link from 'next/link'
import { Burger } from '@mantine/core'

const NavBar = ({ opened, toggle }) => {
    return (
        <nav className={styles.navBar}>
            <ul className={styles.navUl}>
                <li><Link href='/'>Home</Link></li>
                <li><Link href='/detect'>Detect</Link></li>
                <li><Link href='/train'>Train</Link></li>
            </ul>
            <Burger
                opened={opened}
                onClick={toggle}
                size="sm"
            />
        </nav>
    )
}

export default NavBar