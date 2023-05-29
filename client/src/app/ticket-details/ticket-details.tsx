import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Ticket, User } from '@acme/shared-models';
import Chip from '../../components/Chip/Chip';
import BackButton from '../../components/BackButton/BackButton';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import styles from './ticket-details.module.css';
import CompleteTicketModal from './components/modal-complete-ticket/CompleteTicketModal';
import AssignTicketModal from './components/modal-assign-ticket/AssignTicketModal';

export interface TicketDetailsProps {
  users: User[]
}

export function TicketDetails(props: TicketDetailsProps) {
  const { id } = useParams();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [pageError, setPageError] = useState('');
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [openCompleteModal, setOpenCompleteModal] = useState(false);

  useEffect(() => {
    async function fetchTicket() {
      await fetch(`/api/tickets/${id}`).then(async (response) => {
        if (response.ok) {
          return setTicket(await response.json());
        }

        return Promise.reject(response.statusText);
      }).catch((error) => {
        setPageError(error);
      });
    }

    if (id) {
      fetchTicket();
    }
  }, [id]);

  if (pageError) {
    return <div>{pageError}</div>;
  }

  if (!ticket) {
    return null;
  }

  const assignee: User | null = (props.users && props.users.find(user => user.id === ticket.assigneeId)) || null;

  const handleCompleteTicket = async () => {
    if (ticket.completed) {
      await fetch(`/api/tickets/${id}/complete`, { method: 'DELETE' }).then();
      window.location.reload();
      return;
    }

    await fetch(`/api/tickets/${id}/complete`, { method: 'PUT' }).then();
    window.location.reload();
  }

  const handleAssignTicket = async (userId: number | null) => {
    if (assignee) {
      await fetch(`/api/tickets/${id}/unassign`, { method: 'PUT' }).then();
      window.location.reload();
      return;
    }

    await fetch(`/api/tickets/${id}/assign/${userId}`, { method: 'PUT' }).then();
    window.location.reload();
  }

  return (
    <>
      <div className={styles['container']}>
        <div className={styles['row']}>
          <div className={styles['title']}>Description</div>
          <div>{ticket.description}</div></div>
        <div className={styles['row']}>
          <div className={styles['title']}>Assignee</div>
          <div>{assignee && assignee.name}</div>
        </div>
        <div className={styles['row']}>
          <div className={styles['title']}>Status</div>
          <div>
            <Chip value={ticket.completed} yesLabel="Completed" noLabel="Non-Completed" />
          </div>
        </div>

        <div className={styles['list-action']}>
          <Button
            text={assignee ? 'Unassign' : 'Assign'}
            onClick={() => setOpenAssignModal(!openAssignModal)}
          />
          <Button
            text={ticket.completed ? 'Uncomplete' : 'Complete'}
            onClick={() => setOpenCompleteModal(!openCompleteModal)}
          />
        </div>
      </div>

      <BackButton />

      <Modal
        isOpen={openAssignModal}
        onRequestClose={() => setOpenAssignModal(false)}
      >
        <AssignTicketModal
          assignee={assignee}
          users={props.users}
          onAssignTicket={(userId: number | null) => handleAssignTicket(userId)}
          onClose={() => setOpenAssignModal(false)}
        />
      </Modal>

      <Modal
        isOpen={openCompleteModal}
        onRequestClose={() => setOpenCompleteModal(false)}
      >
        <CompleteTicketModal
          completed={ticket.completed}
          onCompleteTicket={handleCompleteTicket}
          onClose={() => setOpenCompleteModal(false)}
        />
      </Modal>
    </>
  );
}

export default TicketDetails;
