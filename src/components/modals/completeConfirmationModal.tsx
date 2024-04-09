import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface CompleteConfirmationProps {
  fetchTodos: () => Promise<void>;
  todo: any;
  show: boolean;
  handleClose: () => void;
  handleComplete: (data: any) => void;
}

const CompleteConfirmation: React.FC<CompleteConfirmationProps> = ({ fetchTodos, todo, show, handleClose,handleComplete}) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleComplete(todo?._id);
    handleClose();
    fetchTodos();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Mark as Todo complete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div>Mark as completed and can't undo this</div>
          <div className="text-end">
            <Button variant="primary" type="submit" className="mt-4">
              Confirm
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CompleteConfirmation;
