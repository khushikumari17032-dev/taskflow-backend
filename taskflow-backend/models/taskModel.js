let tasks = [];

export const getTasks = () => tasks;

export const addTask = (task) => {
  tasks.push(task);
};

export const updateTask = (id, updatedData) => {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, ...updatedData } : task
  );
};

export const deleteTask = (id) => {
  tasks = tasks.filter(task => task.id !== id);
};