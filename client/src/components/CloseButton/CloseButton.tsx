import styles from './CloseButton.module.css';

export interface CloseButtonProps {
  onClose: () => void;
}

const CloseButton = (props: CloseButtonProps) => {
  return (
    <div className={styles['close-icon-wrapper']} onClick={() => props.onClose()}>
      <img
        className={styles['button-action']}
        src="../../assets/xmark-solid.svg" alt="close"
      />
    </div>
  )
}

export default CloseButton;
