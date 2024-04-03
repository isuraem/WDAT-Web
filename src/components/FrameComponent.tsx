// import { FunctionComponent } from "react";
// import Todoitem from "./TodoItem";
// import "./FrameComponent.css";

// interface AppProps {
//     todos: ITodo[]; // Define the todos prop
// }

// const FrameComponent: React.FC<AppProps> = ({ todos }) => {
//     return (
//         <div className="tasks-to-do-4-parent">
//             <div className="tasks-to-do">Tasks to do - 4</div>
//             <Todoitem />
//             <Todoitem check="/check-1.svg" />
//             <div className="todoitem2">
//                 <div className="todoitem-inner" />
//                 <input
//                     className="frame-input"
//                     placeholder="To study React fundamentals"
//                     type="text"
//                 />
//                 <div className="frame-group">
//                     <div className="rectangle-group">
//                         <div className="frame-item" />
//                         <img className="check-icon1" alt="" src="/check-2.svg" />
//                     </div>
//                     <input className="group-input1" type="checkbox" />
//                 </div>
//             </div>
//             <Todoitem check="/check-3.svg" />
//         </div>
//     );
// };

// export default FrameComponent;
import React from "react";
import Todoitem from "./TodoItem";
import "./FrameComponent.css";

interface AppProps {
    todos: ITodo[]; 
    statusTitle: String;
    pendingStatus: Boolean;
    fetchTodos: () => Promise<void>;
}

const FrameComponent: React.FC<AppProps> = ({ fetchTodos,todos, statusTitle, pendingStatus}) => {
    return (
        <div className="tasks-to-do-4-parent">
            <div className="tasks-to-do">{statusTitle} - {todos?.length}</div>
            {todos?.length === 0 ? (
                <div>No todos found</div>
            ) : (
                todos?.map((todo, index) => (
                    <Todoitem fetchTodos={fetchTodos}  key={index} todo={todo} pendingStatus={pendingStatus}/>
                ))
            )}
            
        </div>
    );
};

export default FrameComponent;