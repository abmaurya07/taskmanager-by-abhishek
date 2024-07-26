import { createSlice } from '@reduxjs/toolkit';
import { fetchTasks, deleteTask, deleteSelectedTasks, updateTaskStatus, addTask, updateTask, getTaskSummary } from './tasksActions'


interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
}

interface TasksState {
  tasks: Task[];
  taskSummary: {
    'All': number,
    'Done': number,
    'In Progress': number,
    'To Do': number
  }
  loading: boolean;
  hasMore: boolean;
  page: number;
  selectedTasks: string[];
  selectedTask: Task | null;
  status: 'All' | 'To Do' | 'In Progress' | 'Done';
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  hasMore: true,
  taskSummary: {
    'All': 0,
    'Done': 0,
    'In Progress': 0,
    'To Do': 0
  },
  page: 1,
  selectedTasks: [],
  selectedTask: null,
  status: 'All',
  
};



const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setSelectedTask(state, action) {
      state.selectedTask = action.payload;
    },
    setSelectedTasks(state, action) {
      state.selectedTasks = action.payload;
    },
    setFilterStatus(state, action) {
      state.status = action.payload;
    },
    sortByDate(state, action) {

      
      if (action.payload === 'asc') {

        state.tasks.sort((a, b) =>  new Date(a.dueDate) - new Date(b.dueDate));
      } else if (action.payload === 'desc') {
        state.tasks.sort((a, b) =>  new Date(b.dueDate) -  new Date(a.dueDate));
      }


    },
    toggleSelectTask(state, action) {
      const taskId = action.payload;
      if (state.selectedTasks.includes(taskId)) {
        state.selectedTasks = state.selectedTasks.filter(id => id !== taskId);
      } else {
        state.selectedTasks.push(taskId);
      }
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setHasMore(state, action) {
      state.hasMore = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = state.page === 1 ? action.payload : [...state.tasks, ...action.payload];
        state.loading = false;
        state.hasMore = action.payload.length > 0;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((task) => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task._id !== action.payload);
      })
      .addCase(deleteSelectedTasks.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => !action.payload.includes(task._id));
        state.selectedTasks = [];
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const { taskId, status } = action.payload;
        const task = state.tasks.find(task => task._id === taskId);
        if (task) task.status = status;
      })
      .addCase(getTaskSummary.fulfilled, (state, action) => {
        const taskSummary = action.payload.taskSummary
        state.taskSummary = taskSummary;
      });
  },
});

export const { setSelectedTask, setSelectedTasks, toggleSelectTask,setFilterStatus, setPage, setHasMore, sortByDate } = tasksSlice.actions;

export default tasksSlice.reducer;
