import React, { useState } from 'react';
import './App.css';

const initialData = {
  'column-1': {
    title: 'To Do',
    taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
  },
  'column-2': {
    title: 'In Progress',
    taskIds: ['task-5', 'task-6', 'task-7'],
  },
  'column-3': {
    title: 'Done',
    taskIds: ['task-8', 'task-9', 'task-10'],
  },
};

const App = () => {
  const [data, setData] = useState(initialData);
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [dragStartColumn, setdragStartColumn] = useState(null);

  const handleDragStart = (e, taskId, column) => {
    console.log("taskid", taskId)
    setDraggedTaskId(taskId);
    setdragStartColumn(column)
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, columnId) => {
    console.log("columnId", columnId, dragStartColumn)
    const column = data[columnId];
    const columnTobeDeleted = dragStartColumn;
    const taskIds = [...column.taskIds];
    const deletedTaskIds = [...data[dragStartColumn].taskIds];
    

    if (draggedTaskId) {
      const draggedTaskIndex = taskIds.indexOf(draggedTaskId);
      taskIds.push(draggedTaskId);
      const newArr = deletedTaskIds.filter(taskId => {
        return taskId != draggedTaskId
      });
      const newColumn1 = { ...data[dragStartColumn], taskIds: [...newArr] };
      const newData1 = { ...data, [dragStartColumn]: newColumn1}
      setData({...newData1});

      const newColumn = { ...column, taskIds: [...taskIds] };
      const newData = { ...data, [columnId]: newColumn };

      setData(newData);
      setDraggedTaskId(null);
    }
  };

  return (
    <div className="kanban-board">
      {Object.keys(data).map((columnId) => {
        const column = data[columnId];
        const tasks = column.taskIds.map((taskId) => {
          return (
            <div
              key={taskId}
              className="kanban-task"
              draggable
              onDragStart={(e) => handleDragStart(e, taskId, columnId)}
            >
              {taskId}
            </div>
          );
        });

        return (
          <div
            key={columnId}
            className="kanban-column"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, columnId)}
          >
            <h3>{column.title}</h3>
            <div className="kanban-tasks">{tasks}</div>
          </div>
        );
      })}
    </div>
  );
};

export default App;

