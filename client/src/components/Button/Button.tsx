import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const Button = (props: ButtonProps) => {
  return (
    <div className={styles['container']}>
      <button className={styles['button']} type="button" {...props}>
        {props.text}
      </button>
    </div>
  )
}

export default Button;
