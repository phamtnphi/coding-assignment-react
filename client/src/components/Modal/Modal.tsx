import ReactModal from 'react-modal';
import styles from './Modal.module.css';

const customStyles: ReactModal.Styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    background: '#fff',
    overflow: 'auto',
    outline: 'none',
    minWidth: 600,
  },
};

export interface ModalProps extends ReactModal.Props {
  children: React.ReactNode;
}

const Modal = (props: ModalProps) => {
  return (
    <div className={styles['list-action']}>
      <ReactModal
        {...props}
        className={styles['list-action']}
        style={customStyles}
        ariaHideApp={false}
      >
        {props.children}
        {/* <div className={styles['close-icon-wrapper']}>
          <img
            className={styles['button-action']}
            src="../../assets/xmark-solid.svg" alt="close"
          />
        </div> */}
      </ReactModal>
    </div>
  )
}

export default Modal;
