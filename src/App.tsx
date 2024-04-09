import { FunctionComponent, useState, useEffect } from "react";
import FrameComponent from "./components/FrameComponent";
import IconButton from "./components/shared/button";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./App.css";
import { getTodos, addTodo } from './services/util/todo/API'
import io from 'socket.io-client';
import { toast } from 'react-toastify';

const App: FunctionComponent = () => {
  const [todos, setTodos] = useState<ITodo[]>([])
  const [showModal, setShowModal] = useState(false);
  const [trueData, setTrueData] = useState<ITodo[]>([]);
  const [falseData, setFalseData] = useState<ITodo[]>([]);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async (): Promise<void> => {
    try {
      const newdata = await getTodos()
      setTodos(newdata);
    } catch (err) {
      console.log(err);
    }
  };

  const mangeData = async (newTodo: ITodo): Promise<void> => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  useEffect(() => {
    const trueArray = todos?.filter((item) => item.status === true);
    const falseArray = todos?.filter((item) => item.status === false);

    setTrueData(trueArray);
    setFalseData(falseArray);
  }, [todos]);

  const AddTODOModal: React.FC<{ fetchTodos: () => Promise<void>; show: boolean; handleClose: () => void }> = ({ fetchTodos, show, handleClose }) => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');



    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // Check if title contains "<" or ">"
      if (title.includes('<') || title.includes('>')) {
        toast.error(<div>{'Title cannot contain "<" or ">" symbols'}</div>, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
      // Check if message contains "<" or ">"
      if (message.includes('<') || message.includes('>')) {
        toast.error(<div>{'Message cannot contain "<" or ">" symbols'}</div>, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
      // Check if title or message is empty
      if (!title.trim() || !message.trim()) {
        toast.error(<div>{'Please fill in both fields'}</div>, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      await addTodo({
        _id: '',
        name: title,
        description: message,
        status: false,
      });
      setTitle('');
      setMessage('');
      handleClose();
    };

    useEffect(() => {
      const URL = process.env.REACT_APP_SERVER;
      const socket = io(`${URL}`);

      socket.on('todoAdded', (newTodo) => {
        const data = [];
        data.push((prevTodos: never) => [...prevTodos, newTodo])
        fetchTodos()
      });

      return () => {
        socket.off('todoAdded');
      };
    }, []);


    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicInput1">
              <Form.Label>Todo title</Form.Label>
              <Form.Control type="text" placeholder="Do home work" value={title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>

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

  return (
    <div className="app">
      <AddTODOModal fetchTodos={fetchTodos} show={showModal} handleClose={handleCloseModal} />
      <div className="f-r-a-m-e">
        <div className="input">
          <div className="input-child" />
          <div className="add-a-new">Add a new Todo</div>
        </div>
        <div className="mt-2">
          <IconButton onClick={handleButtonClick} textTag="+" />
        </div>
      </div>
      <FrameComponent fetchTodos={fetchTodos} pendingStatus={false} statusTitle={'Task to do'} todos={falseData} />
      <FrameComponent fetchTodos={fetchTodos} pendingStatus={true} statusTitle={'Done'} todos={trueData} />
    </div>
  );
};

export default App;