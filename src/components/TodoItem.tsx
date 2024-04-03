import { FunctionComponent, useState, useEffect } from "react";
import "./Todoitem.css";
import { log } from "console";
import IconButton from "./shared/button";
import { deleteTodo, completeTodo, updateTodo } from '../services/util/todo/API'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
export type TodoitemType = {
  key?: Number;
  todo?: ITodo;
  pendingStatus?: Boolean;
  fetchTodos: () => Promise<void>;
};

const Todoitem: FunctionComponent<TodoitemType> = ({ key, todo, pendingStatus, fetchTodos }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalComplete, setShowModalComplete] = useState(false);
  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };
  const handleDelete = async (data: any) => {
    console.log("data", data)
    await deleteTodo(data);
    fetchTodos()
  };
  const handleComplete = async (data: any) => {
    console.log("data", data)
    await completeTodo(data);
    fetchTodos()
  };
  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleCompleteButtonClick = () => {
    setShowModalComplete(true);
  };

  const handleCompleteCloseModal = () => {
    setShowModalComplete(false);
  };

  const MyModal: React.FC<{ fetchTodos: () => Promise<void>; todo: any; show: boolean; handleClose: () => void }> = ({ fetchTodos, todo, show, handleClose }) => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await updateTodo({
        id: todo._id,
        description: message,
      });
      setMessage('');
      handleClose();
      fetchTodos()
    };
    useEffect(() => {
      // Set the message when the modal is opened
      setMessage(todo?.description || '');
    }, [todo]);
    return (
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicInput2">
              <Form.Label>Todo message</Form.Label>
              <Form.Control type="text" placeholder="maths , science" value={message} onChange={(e) => setMessage(e.target.value)} />
            </Form.Group>
            <div className="text-end">
              <Button variant="primary" type="submit" className="mt-4">
                Submit
              </Button>
            </div>
  
          </Form>
        </Modal.Body>
      </Modal>
    );
  };
  
  const CompleteConfirmation: React.FC<{ fetchTodos: () => Promise<void>; todo: any; show: boolean; handleClose: () => void }> = ({ fetchTodos, todo, show, handleClose }) => {
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await completeTodo(todo?._id);
      handleClose();
      fetchTodos()
    };

    return (
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Mark as Todo complete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div>
              Mark as completed and can't undone this
            </div>
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
  
  return (
    <>

      <div className="Main-item">
        <MyModal fetchTodos={fetchTodos} todo={todo} show={showModal} handleClose={handleCloseModal} />
        <CompleteConfirmation fetchTodos={fetchTodos} todo={todo} show={showModalComplete} handleClose={handleCompleteCloseModal} />
        <div className="todoitem1">
          <div className="todoitem-item" />
          <div className="to-study-react-fundamentals-wrapper">
            <div className={pendingStatus === false ? "to-study-react1" : "to-study-react"}>{todo?.name}</div>
          </div>

          <div className="frame-parent">
            <div className="rectangle-parent">
              <div className="frame-child" />
            </div>
            <IconButton onClick={() => handleDelete(todo?._id)} textTag="delete" />
            {pendingStatus === false &&
              <IconButton onClick={toggleAccordion} textTag={"⭐"} />
            }
            {pendingStatus === false &&
              <IconButton onClick={handleCompleteButtonClick} textTag={"🏁"} />
            }
            <IconButton onClick={toggleAccordion} textTag={isExpanded === true ? "👆🏾" : "👇🏾"} />
          </div>

        </div>
        {isExpanded && (
          <div className="second-div">
            <div className="to-study-react1">message : {todo?.description}</div>
            {pendingStatus === false &&
              <IconButton onClick={handleButtonClick} textTag="update" />
            }
          </div>
        )}
      </div>
    </>
  );
};

export default Todoitem;