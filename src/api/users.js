import { api } from './axios';

export const getUsers = async () => {
  const res = await api.get('/users');
  return res.data;
};

export const createUser = async (user) => {
  const res = await api.post('/users', user);
  return res.data;
};

export const updateUser = async ({ id, ...data }) => {
  const res = await api.put(`/users/${id}`, data);
  return res.data;
};

export const deleteUser = async (id) => {
  await api.delete(`/users/${id}`);
};
