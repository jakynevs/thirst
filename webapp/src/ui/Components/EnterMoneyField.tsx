import React from 'react'

interface EnterMoneyFieldProps {
    moneyGiven: string;
    setMoneyGiven: (moneyGiven: string) => void;

}
const EnterMoneyField: React.FC<EnterMoneyFieldProps> = ({ moneyGiven, setMoneyGiven }) => {

    const handleChange = (e) => {
        const value = e.target.value;
        if (!value || parseFloat(value) >= 0) {
            setMoneyGiven(value)
        }
    }
    return (
        <div>
            <input
                type='number'
                value={moneyGiven}
                onChange={handleChange}
                placeholder='Enter money'
            />
        </div>
    )
}

export default EnterMoneyField;
