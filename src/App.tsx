import { Routes, Route } from 'react-router-dom';
import Recipes from './pages/recipes';
import Recipe from './pages/recipe';
import PageLayout from './components/page-layout';
import RecipeFrom from './pages/create-recipe';

function App() {
    return (
        <Routes>
            <Route path="/" element={<PageLayout />}>
                <Route index element={<Recipes />} />
                <Route path="/:id" element={<Recipe />} />
                <Route path="/add-recipe" element={<RecipeFrom />} />
                <Route path="/edit-recipe/:id" element={<RecipeFrom />} />
            </Route>
        </Routes>
    );
}

export default App;
