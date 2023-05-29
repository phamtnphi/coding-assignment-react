import styles from './Input.module.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
}

const Input = (props: InputProps) => {
  return (
    <input {...props} className={styles['input']} type="text" />
  )
}

export default Input;
