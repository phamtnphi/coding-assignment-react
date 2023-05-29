import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './tickets.module.css';
import { Ticket, User } from '@acme/shared-models';
import Chip from '../../components/Chip/Chip';
import Select, { SelectOption } from '../../components/Select/Select';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import AddTicketModal from './components/modal-add-ticket/AddTicketModal';

export interface TicketsProps {
  tickets: Ticket[];
  users: User[]
}

export function Tickets(props: TicketsProps) {
  const [displayedTickets, setDisplayedTickets] = useState<Ticket[]>([]);
  const [openAddModal, setOpenAddModal] = useState(false);

  useEffect(() => {
    setDisplayedTickets(props.tickets);
  }, [props.tickets]);

  const handleFilterTickets = (value: boolean) => {
    if (value === undefined) {
      setDisplayedTickets(props.tickets);
      return;
    }

    const filterData = props.tickets.filter((ticket) => ticket.completed === value);
    setDisplayedTickets(filterData);
  }

  const handleAddTicket = async (description: string) => {
    await fetch(`/api/tickets`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description })
    }).then();
    window.location.reload();
  }

  return (
    <div>
      <div className={styles['first-line']}>
        <div className={styles['title-wrapper']}>
          <h2>Tickets</h2>
          <Button text='Add Ticket' onClick={() => setOpenAddModal(!openAddModal)} />
        </div>
        <div className={styles['select-wrapper']}>
          <Select
            isClearable
            options={[
              { value: true, label: 'Completed' },
              { value: false, label: 'Uncompleted' },
            ]}
            onChange={(data) => {
              const chosenData = data as SelectOption;
              handleFilterTickets(chosenData?.value as boolean)
            }}
          />
        </div>
      </div>
      {displayedTickets ? (
        <table className={styles['table']}>
          <thead>
            <tr>
              <th className={styles['table-cell-header']}>ID</th>
              <th className={styles['table-cell-header']}>Description</th>
              <th className={styles['table-cell-header']}>Assignee</th>
              <th className={styles['table-cell-header']}>Status</th>
              <th className={styles['table-cell-header']}>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedTickets.map((t) => {
              const assignee = props.users.find(user => user.id === t.assigneeId);
              return (
                <tr key={t.id}>
                  <th className={styles['table-cell-body']}>{t.id}</th>
                  <th className={styles['table-cell-body']}>{t.description}</th>
                  <th className={styles['table-cell-body']}>
                    {assignee && assignee.name}
                  </th>
                  <th className={styles['table-cell-body']}>
                    <Chip value={t.completed} yesLabel="Completed" noLabel="Uncompleted" />
                  </th>
                  <th className={styles['table-cell-body']}>
                    <Link to={`/${t.id}`}>
                      <img
                        className={styles['button-action']}
                        src="../../assets/eye-solid.svg" alt="view-detail"
                      />
                    </Link>
                  </th>
                </tr>
              )
            })}
          </tbody>
        </table>
      ) : (
        <span>...</span>
      )}

      <Modal
        isOpen={openAddModal}
        onRequestClose={() => setOpenAddModal(false)}
      >
        <AddTicketModal
          users={props.users}
          onAddTicket={handleAddTicket}
          onClose={() => setOpenAddModal(false)}
        />
      </Modal>
    </div>
  );
}

export default Tickets;
