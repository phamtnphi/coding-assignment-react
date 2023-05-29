import Button from '../../../../components/Button/Button';
import CloseButton from '../../../../components/CloseButton/CloseButton';
import styles from './CompleteTicketModal.module.css';

export interface CompleteTicketModalProps {
  completed: boolean;
  onClose: () => void;
  onCompleteTicket: () => void;
}

const CompleteTicketModal = (props: CompleteTicketModalProps) => {
  return (
    <>
      <CloseButton onClose={props.onClose} />

      <div className={styles['title']}>
        {props.completed ? `Uncomplete Ticket` : `Complete Ticket` }
      </div>

      <div className={styles['main']}>
        {props.completed
          ? `Are you sure want to uncomplete this ticket.`
          : `Are you sure want to complete this ticket.` }
      </div>

      <div className={styles['list-action']}>
        <Button text="Yes" onClick={() => props.onCompleteTicket()} />
        <Button text="No" onClick={() => props.onClose()} />
      </div>
    </>
  )
}

export default CompleteTicketModal;
