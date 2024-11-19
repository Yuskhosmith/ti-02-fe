import apiClient from './index';
import { CreateRecipeDataType } from '../actions/recipes/types';

export const getRecipes = async () => {
    const response = await apiClient.get('/recipes');
    return response.data;
};

export const getRecipeById = async (id: string) => {
    const response = await apiClient.get(`/recipes/${id}`);
    return response.data;
};

export const createRecipe = async (recipeData: FormData) => {
    const response = await apiClient.post('/recipes', recipeData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const updateRecipe = async (id: string, recipeData: FormData) => {
    const response = await apiClient.put(`/recipes/${id}`, recipeData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const deleteRecipe = async (id: string) => {
    const response = await apiClient.delete(`/recipes/${id}`);
    return response.data;
};
