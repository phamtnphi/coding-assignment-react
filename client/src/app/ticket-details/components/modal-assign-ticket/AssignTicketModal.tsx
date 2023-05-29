import { User } from '@acme/shared-models';
import Select, { SelectOption } from '../../../../components/Select/Select';
import Button from '../../../../components/Button/Button';
import CloseButton from '../../../../components/CloseButton/CloseButton';
import styles from './AssignTicketModal.module.css';
import { useState } from 'react';

export interface AssignTicketModalProps {
  assignee: User | null;
  users: User[];
  onClose: () => void;
  onAssignTicket: (userId: number | null) => void;
}

const AssignTicketModal = (props: AssignTicketModalProps) => {
  const [chosen, setChosen] = useState<number | null>(null);
  const [error, setError] = useState('');

  const handleAssignTicket = () => {
    if (!props.assignee && !chosen) {
      setError('This field is mandatory');
      return;
    }
    props.onAssignTicket(chosen)
  }

  return (
    <>
      <CloseButton onClose={props.onClose} />

      <div className={styles['title']}>
        {props.assignee ? `Unassign` : `Assign` }
      </div>

      <div className={styles['main']}>
        {props.assignee
          ? `Are you sure want to unassign this ticket.`
          : (
            <>
              <span className={styles[`row-title${error && '-error'}`]}>Assign for</span>
              <span className={styles[`select-container`]}>
                <Select
                  options={
                    props.users.map((u) => {
                      return {
                        value: u.id,
                        label: u.name,
                      }
                    })
                  }
                  onChange={(data) => {
                    const newData = data as SelectOption;
                    if (newData && newData?.value) {
                      setError('');
                    } else {
                      setError('This field is mandatory');
                    }
                    setChosen(newData?.value as number)
                  }}
                />
                {error && <div className={styles['error']}>{error}</div>}
              </span>
            </>
          )}
      </div>

      <div className={styles['list-action']}>
        <Button text="Yes" onClick={handleAssignTicket} />
        <Button text="No" onClick={() => props.onClose()} />
      </div>
    </>
  )
}

export default AssignTicketModal;
