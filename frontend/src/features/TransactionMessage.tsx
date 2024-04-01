import React from "react";

type TransactionMessageProps = {
  text: string;
};

export const TransactionMessage: React.FC<TransactionMessageProps> = ({
  text,
}) => {
  const lines = text.split("\n");

  return (
    <header className="transactionmessage">
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
