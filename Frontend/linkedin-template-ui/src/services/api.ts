import axios from 'axios';
import { 
  MessageTemplate, 
  CreateMessageTemplate, 
  UpdateMessageTemplate, 
  GenerateTemplate,
  TemplateCategory,
  CreateTemplateCategory,
  UpdateTemplateCategory
} from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Message Templates API
export const messageTemplateApi = {
  getAll: async (): Promise<MessageTemplate[]> => {
    const response = await api.get('/messagetemplates');
    return response.data;
  },

  getById: async (id: number): Promise<MessageTemplate> => {
    const response = await api.get(`/messagetemplates/${id}`);
    return response.data;
  },

  create: async (template: CreateMessageTemplate): Promise<MessageTemplate> => {
    const response = await api.post('/messagetemplates', template);
    return response.data;
  },

  update: async (id: number, template: UpdateMessageTemplate): Promise<MessageTemplate> => {
    const response = await api.put(`/messagetemplates/${id}`, template);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/messagetemplates/${id}`);
  },

  getByCategory: async (categoryId: number): Promise<MessageTemplate[]> => {
    const response = await api.get(`/messagetemplates/category/${categoryId}`);
    return response.data;
  },

  getFavorites: async (): Promise<MessageTemplate[]> => {
    const response = await api.get('/messagetemplates/favorites');
    return response.data;
  },

  generate: async (generateData: GenerateTemplate): Promise<MessageTemplate> => {
    const response = await api.post('/messagetemplates/generate', generateData);
    return response.data;
  },

  use: async (id: number): Promise<MessageTemplate> => {
    const response = await api.post(`/messagetemplates/${id}/use`);
    return response.data;
  },

  search: async (query: string): Promise<MessageTemplate[]> => {
    const response = await api.get(`/messagetemplates/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },
};

// Template Categories API
export const templateCategoryApi = {
  getAll: async (): Promise<TemplateCategory[]> => {
    const response = await api.get('/templatecategories');
    return response.data;
  },

  getById: async (id: number): Promise<TemplateCategory> => {
    const response = await api.get(`/templatecategories/${id}`);
    return response.data;
  },

  create: async (category: CreateTemplateCategory): Promise<TemplateCategory> => {
    const response = await api.post('/templatecategories', category);
    return response.data;
  },

  update: async (id: number, category: UpdateTemplateCategory): Promise<TemplateCategory> => {
    const response = await api.put(`/templatecategories/${id}`, category);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/templatecategories/${id}`);
  },
};

export default api;
