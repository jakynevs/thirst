import React from "react";
import styles from "./DrinkPurchase.module.css";

type TransactionMessageProps = {
  text: string;
  className?: string;
};

export const TransactionMessage: React.FC<TransactionMessageProps> = ({
  text,
  className = "",
}) => {
  return (
    <header className={`${styles.transactionMessage} ${className}`}>
      <h3 className={styles.lineBreakText}>{text}</h3>
    </header>
  );
};
