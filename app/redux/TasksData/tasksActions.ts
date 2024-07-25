import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

//--------------#1-----------------------

const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

export const addTask = createAsyncThunk(
  'tasks/createTask',
  async (task: any) => {
    
    const response = await axios.post('http://localhost:5000/api/tasks', task, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
)

export const updateTask = createAsyncThunk(
  'tasks/editTask',
  async ({ id, task }: { id: string, task: any }) => {
 console.log(id, task)
    const response = await axios.put(`http://localhost:5000/api/tasks/${id}`, task, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
)

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (page: number) => {
    const response = await axios.get(`http://localhost:5000/api/tasks?page=${page}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  });


  
  export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId: string) => {
    await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return taskId;
  });
  
  export const deleteSelectedTasks = createAsyncThunk('tasks/deleteSelectedTasks', async (taskIds: string[]) => {
    await axios.delete('http://localhost:5000/api/tasks/bulk-delete', {
      data: { ids: taskIds },
      headers: { Authorization: `Bearer ${token}` },
    });
    return taskIds;
  });
  
  export const updateTaskStatus = createAsyncThunk('tasks/updateTaskStatus', async ({ taskId, status }: { taskId: string, status: string }) => {
    console.log('taskID', taskId, 'status', status)
    await axios.put(`http://localhost:5000/api/tasks/${taskId}`, { status }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { taskId, status };
  });

  export const getTaskSummary = createAsyncThunk('tasks/getTaskSummary', async () => {
    const response = await axios.get('http://localhost:5000/api/tasks/summary', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }) 

