import logo from "./rviewer-logo.svg";
import styles from './Header.module.css';

type HeaderProps = {
    text: string;
  };
  
  export const Header: React.FC<HeaderProps> = ({ text }) => {

    return (
        <header className={styles.header}>
            <img width={80} src={logo} className={styles.rviewerLogo} alt="Rviewer logo"/>
            <h3>
                {text}
            </h3>
        </header>
    )
}
