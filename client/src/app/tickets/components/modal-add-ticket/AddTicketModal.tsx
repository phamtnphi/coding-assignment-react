import Select from "../../../../components/Select/Select";
import CloseButton from "../../../../components/CloseButton/CloseButton";
import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Input/Input";
import styles from './AddTicketModal.module.css';
import { User } from "@acme/shared-models";
import { useState } from "react";

export interface AddTicketModalProps {
  users: User[];
  onAddTicket: (description: string) => void;
  onClose: () => void;
}

const AddTicketModal = (props: AddTicketModalProps) => {
  const [error, setError] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTicket = () => {
    if (!description) {
      setError('This field is mandatory');
      return;
    }
    props.onAddTicket(description);
  }

  return (
    <>
      <CloseButton onClose={props.onClose} />
      <div className={styles['title']}>
        Add Ticket
      </div>

      <div className={styles['main']}>
        <div className={styles['row']}>
          <span className={styles[`row-title${error && '-error'}`]}>Description*</span>
          <div className={styles[`row-field${error && '-error'}`]}>
            <Input
              placeholder="Description"
              onChange={(data) => {
                if (data.target.value) {
                  setError('');
                } else {
                  setError('This field is mandatory');
                }

                setDescription(data.target.value);
              }}
            />
            {error && <div className={styles['error']}>{error}</div>}
          </div>
        </div>
      </div>

      <div className={styles['list-action']}>
        <Button text="Create" onClick={() => handleAddTicket()} />
        <Button text="Cancel" onClick={() => props.onClose()} />
      </div>
    </>
  )
}

export default AddTicketModal;
