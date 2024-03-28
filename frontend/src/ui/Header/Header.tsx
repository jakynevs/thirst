import logo from "./rviewer-logo.svg";
import styles from './Header.module.css';
import React from "react";

type HeaderProps = {
    text: string;
  };
  
export const Header: React.FC<HeaderProps> = ({ text }) => {
    const lines = text.split('\n');

    return (
        <header className={styles.header}>
            <img width={80} src={logo} className={styles.rviewerLogo} alt="Rviewer logo"/>
            <h3>
                {lines.map((line, index) => (
                    <React.Fragment key={index}>
                        {line}{index < lines.length - 1 && <br />}
                    </React.Fragment>
                ))}
            </h3>
        </header>
    )
}
