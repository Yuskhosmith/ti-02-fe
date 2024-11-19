import React from 'react';
import { useLocation } from 'react-router-dom';
import { RecipeType } from '../../actions/recipes/types';

const api_url = process.env.REACT_APP_API_URL;

const Recipe = () => {
    const location = useLocation();
    const recipe = location.state as RecipeType;

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <span className="text-gray-400 text-sm">#{recipe._id}</span>
                <h1 className="text-4xl">{recipe.title}</h1>
                <span className="text-gray-400 text-sm">
                    {String(
                        new Date(recipe.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        }),
                    )}
                </span>
            </div>

            <img src={`${api_url}/${recipe.image}`} alt={recipe.title} />
            <div className="space-y-2">
                <h2 className="text-2xl">Ingredients</h2>
                <ul className="list-disc list-inside space-y-1">
                    {recipe.ingredients.map((ingredient, i) => (
                        <li key={i}>{ingredient}</li>
                    ))}
                </ul>
            </div>
            <div className="space-y-2">
                <h2 className="text-2xl">Instructions</h2>
                <ol className="list-decimal ml-4 space-y-1">
                    {recipe.instructions.map((instruction, i) => (
                        <li key={i}>{instruction}</li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default Recipe;
