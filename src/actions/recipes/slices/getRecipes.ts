import { getRecipes } from '../../../api/recipes';
import { RecipeType } from '../types';

export const GetRecipes = async () => {
    const data = await getRecipes();
    return data as {
        currentPage: number;
        data: RecipeType[];
        totalPages: number;
        totalItem: number;
    };
};
