import React, { useState } from 'react'
import styles from './Home.module.css'
import DrinkPurchase from '../../features/DrinkPurchase/DrinkPurchase';

const Home: React.FC = () => {
    const [moneyGiven, setMoneyGiven] = useState('');

    return (
        <div className={styles.home}>
            <DrinkPurchase /> 
        </div>
    )
}

export default Home;
