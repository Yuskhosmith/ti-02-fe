export type CreateRecipeDataType = {
    title: string;
    ingredients: string[];
    instructions: string[];
    image?: File;
};

export type RecipeType = {
    _id: string;
    title: string;
    ingredients: string[];
    instructions: string[];
    image?: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};
