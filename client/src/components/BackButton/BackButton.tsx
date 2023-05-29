import { Link } from "react-router-dom";
import styles from './BackButton.module.css';

const BackButton = () => {
  return (
    <div className={styles['container']}>
      <Link to="/">
        <img
          className={styles['button-action']}
          src="../../assets/arrow-left-solid.svg" alt="back"
        />

        <span className={styles['button-text']}>Back</span>
      </Link>
    </div>
  )
}

export default BackButton;
