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