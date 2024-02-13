import logo from "./rviewer-logo.svg";
import styles from './Header.module.css'

export function Header() {

    return (
        <header className={styles.header}>
            <img width={80} src={logo} className={styles.rviewerLogo} alt="Rviewer logo"/>
            <h3>
                Please choose a drink and enter money
            </h3>
        </header>
    )
}
