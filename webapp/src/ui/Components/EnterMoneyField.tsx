import { useState, useEffect } from 'react';

function EnterMoneyField() {
    const [moneyGiven, setMoneyGiven] = useState('');

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
