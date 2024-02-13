import styles from './Home.module.css'
import Dropdown from '../Components/Dropdown'
import EnterMoneyField from '../Components/EnterMoneyField'

export function Home() {

    return (
        <div className={styles.home}>
        <Dropdown /> 
        <EnterMoneyField />           
        </div>
    )


}
