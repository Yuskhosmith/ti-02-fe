import React from 'react';
import { RecipeType } from '../../actions/recipes/types';
import { useNavigate } from 'react-router-dom';

const api_url = process.env.REACT_APP_API_URL;

const RecipeCard: React.FC<RecipeType> = (recipe) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/${recipe._id}`, { state: recipe });
    };
    return (
        <div
            className="w-full sm:w-72 h-72 space-y-4 rounded-lg overflow-hidden cursor-pointer border border-blue-400 hover:border-blue-600"
            onClick={handleClick}
        >
            <img src={`${api_url}/${recipe.image}`} alt={recipe.title} className="w-full h-48 object-cover" />
            <h2 className="text-lg font-bold text-gray-800 text-ellipsis overflow-hidden px-4">{recipe.title}</h2>
        </div>
    );
};

export default RecipeCard;
