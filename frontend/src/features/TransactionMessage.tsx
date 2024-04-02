import React from "react";
import styles from "./DrinkPurchase.module.css";

type TransactionMessageProps = {
  text: string;
  className?: string;
};

export const TransactionMessage: React.FC<TransactionMessageProps> = ({
  text,
}) => {
  const lines = text.split("\n");

  return (
    <header className={styles.transactionMessage}>
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
