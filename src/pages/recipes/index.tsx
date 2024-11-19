import React, { useEffect, useState } from 'react';
import { GetRecipes } from '../../actions/recipes';
import { RecipeType } from '../../actions/recipes/types';
import RecipeCard from '../../components/ui/card';

const Recipes = () => {
    const [recipes, setRecipes] = useState<RecipeType[]>([]);
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const data = await GetRecipes();
                setRecipes(data.data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes();
    }, []);
    return (
        <div className="flex gap-4 flex-wrap">
            {recipes.map((recipe) => (
                <RecipeCard {...recipe} key={recipe._id} />
            ))}
        </div>
    );
};

export default Recipes;
