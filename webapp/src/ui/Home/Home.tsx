import styles from './Home.module.css'
import Dropdown from '../Components/Dropdown'
import EnterField from '../Components/EnterField'

export function Home() {

    return (
        <div className={styles.home}>
        <Dropdown /> 
        <EnterField />           
        </div>
    )


}
