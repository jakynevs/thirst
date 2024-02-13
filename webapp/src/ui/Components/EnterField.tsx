import { useState, useEffect } from 'react';

function EnterField() {
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

export default EnterField;
