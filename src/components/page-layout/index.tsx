import React from 'react';
import { Outlet, useLocation, useParams, useNavigate } from 'react-router-dom';
import { deleteRecipe } from '../../api/recipes';

const PageLayout = () => {
    const location = useLocation();
    const { id } = useParams();
    const isEditing = location.pathname.includes(`/${id}`) && id;
    const isRootOrDetailRoute = location.pathname === '/' || location.pathname === `/${id}`;
    const navigate = useNavigate();
    const cta = () => {
        if (isEditing) {
            navigate(`/edit-recipe/${id}`);
        } else {
            navigate('/add-recipe');
        }
    };
    const _delete = async () => {
        await deleteRecipe(id as string);
        navigate('/');
    };
    return (
        <main className="mx-auto max-w-5xl w-11/12 space-y-4 my-8">
            <div className="flex justify-between">
                <h1 className="text-3xl font-semibold cursor-pointer" onClick={() => navigate('/')}>
                    Recipes
                </h1>
                {isRootOrDetailRoute && (
                    <div className="flex gap-4">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={cta}
                        >
                            {isEditing ? 'Edit Recipe' : 'Add Recipe'}
                        </button>
                        {isEditing && (
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                onClick={_delete}
                            >
                                Delete Recipe
                            </button>
                        )}
                    </div>
                )}
            </div>
            <Outlet />
        </main>
    );
};

export default PageLayout;
