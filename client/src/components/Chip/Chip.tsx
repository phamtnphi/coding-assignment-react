import styles from './Chip.module.css';

export interface ChipProps {
  value: boolean;
  yesLabel: string;
  noLabel: string;
}

const Chip = (props: ChipProps) => {
  return (
    <div>
      {props.value
        ? <span className={styles['yesValue']}>{props.yesLabel}</span>
        : <span className={styles['noValue']}>{props.noLabel}</span>
      }
    </div>
  )
}

export default Chip;
