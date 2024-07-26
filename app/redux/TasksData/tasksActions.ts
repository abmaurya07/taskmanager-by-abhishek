import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true // Ensure cookies are sent with requests
});

export const addTask = createAsyncThunk(
  'tasks/createTask',
  async (task: any) => {
    const response = await axiosInstance.post('/api/tasks', task);
    return response.data;
  }
);

export const updateTask = createAsyncThunk(
  'tasks/editTask',
  async ({ id, task }: { id: string, task: any }) => {
    const response = await axiosInstance.put(`/api/tasks/${id}`, task);
    return response.data;
  }
);

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (page: number) => {
    const response = await axiosInstance.get(`/api/tasks?page=${page}`);
    return response.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId: string) => {
    await axiosInstance.delete(`/api/tasks/${taskId}`);
    return taskId;
});

export const deleteSelectedTasks = createAsyncThunk('tasks/deleteSelectedTasks', async (taskIds: string[]) => {
    await axiosInstance.delete('/api/tasks/bulk-delete', {
      data: { ids: taskIds }
    });
    return taskIds;
});

export const updateTaskStatus = createAsyncThunk('tasks/updateTaskStatus', async ({ taskId, status }: { taskId: string, status: string }) => {
    await axiosInstance.put(`/api/tasks/${taskId}`, { status });
    return { taskId, status };
});

export const getTaskSummary = createAsyncThunk('tasks/getTaskSummary', async () => {
    const response = await axiosInstance.get('/api/tasks/summary');
    return response.data;
});
