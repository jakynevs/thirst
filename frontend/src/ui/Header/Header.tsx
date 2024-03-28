import styles from "./Header.module.css";
import React from "react";

type HeaderProps = {
  text: string;
};

export const Header: React.FC<HeaderProps> = ({ text }) => {
  const lines = text.split("\n");

  return (
    <header className={styles.header}>
      <h3>
        {lines.map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < lines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </h3>
    </header>
  );
};
