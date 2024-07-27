import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '@utils/axiosInstance'
import axios from 'axios';



export const addTask = createAsyncThunk(
  'tasks/createTask',
  async (task: any) => {
    const response = await axios.post('/api/tasks/addTask', task, {
      withCredentials: true
    } );
    return response.data;
  }
);

export const updateTask = createAsyncThunk(
  'tasks/editTask',
  async ({ id, task }: { id: string, task: any }) => {
    const response = await axios.put(`/api/tasks/updateTask`, {id, task}, {
      withCredentials: true
    } );
    return response.data;
  }
);

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (page: number) => {
    const response = await axios.get(`/api/tasks/fetchTasks?page=${page}`, {
      withCredentials: true
    });
    return response.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId: string) => {
    await axios.delete(`/api/tasks?taskId=${taskId}`,{
      withCredentials: true
    });
    return taskId;
});

export const deleteSelectedTasks = createAsyncThunk('tasks/deleteSelectedTasks', async (taskIds: string[]) => {
    await axios.delete('/api/tasks/bulkDelete', {
      data: { ids: taskIds },
      withCredentials: true
    }, );
    return taskIds;
});

export const updateTaskStatus = createAsyncThunk('tasks/updateTaskStatus', async ({ taskId, status }: { taskId: string, status: string }) => {
    await axios.put(`/api/tasks/updateTaskStatus`, { taskId,status }, {
      withCredentials: true
    });
    return { taskId, status };
});

export const getTaskSummary = createAsyncThunk('tasks/getTaskSummary', async () => {
    const response = await axios.get('/api/tasks/summary', {
      withCredentials: true
    });
    return response.data;
});
