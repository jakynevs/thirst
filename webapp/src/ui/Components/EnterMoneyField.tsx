import React from 'react'

interface EnterMoneyFieldProps {
    moneyGiven: string;
    setMoneyGiven: (moneyGiven: string) => void;

}
const EnterMoneyField: React.FC<EnterMoneyFieldProps> = ({ moneyGiven, setMoneyGiven }) => {
    return (
        <div>
            <input
                type='number'
                value={moneyGiven}
                onChange={(e) => setMoneyGiven(e.target.value)}
                placeholder='Enter money'
            />
        </div>
    )
}

export default EnterMoneyField;
