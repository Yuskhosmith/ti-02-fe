import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateRecipeData, createRecipeDataSchema } from '../../actions/recipes/schemas/client';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipeById, createRecipe, updateRecipe } from '../../api/recipes';
import { ThreeDots } from 'react-loader-spinner';

const api_url = process.env.REACT_APP_API_URL;

const RecipeFrom = () => {
    const { id } = useParams();
    const isEditing = !!id;
    const [isLoading, setIsLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const navigate = useNavigate();
    const form = useForm<CreateRecipeData>({
        resolver: zodResolver(createRecipeDataSchema),
        context: { fileInclusionType: 'append' },
        mode: 'onChange',
        defaultValues: {
            title: '',
            ingredients: [],
            instructions: [],
        },
    });

    const {
        register,
        control,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = form;

    useEffect(() => {
        if (isEditing) {
            setIsLoading(true);
            const fetchRecipe = async () => {
                try {
                    const response = await getRecipeById(id);
                    const { image, ...restData } = response.data;
                    reset(restData);
                    if (image) {
                        setPreviewImage(`${api_url}/${image}`);
                    }
                } catch (error) {
                    console.error('Failed to fetch recipe:', error);
                }
                setIsLoading(false);
            };

            fetchRecipe();
        }
    }, [id, isEditing, reset]);

    const handleEscrowCreate = async (data: CreateRecipeData) => {
        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('title', data.title);
            data.ingredients.forEach((ingredient, index) => {
                formData.append(`ingredients[${index}]`, ingredient);
            });
            data.instructions.forEach((instruction, index) => {
                formData.append(`instructions[${index}]`, instruction);
            });
            if (data.image) {
                formData.append('image', data.image);
            }
            if (isEditing) {
                await updateRecipe(id, formData);
            } else {
                await createRecipe(formData);
            }
            navigate('/');
        } catch (error) {
            console.error('Form submission failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFormError = (errors: any) => {
        console.error('Form errors', errors);
    };

    return (
        <form onSubmit={handleSubmit(handleEscrowCreate, handleFormError)} className="w-full space-y-6">
            {/* Title Field */}
            <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    {...register('title')}
                    disabled={isLoading}
                    className={`w-full h-12 p-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                        errors.title ? 'border-red-500' : ''
                    }`}
                />
                {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
            </div>

            {/* Ingredients Field */}
            <div className="space-y-2">
                <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">
                    Ingredients
                </label>
                <Controller
                    control={control}
                    name="ingredients"
                    render={({ field }) => (
                        <textarea
                            id="ingredients"
                            {...field}
                            value={field.value.join('\n')}
                            onChange={(e) => field.onChange(e.target.value.split('\n'))}
                            disabled={isLoading}
                            placeholder="Enter each ingredient on a new line"
                            className={`w-full p-2 h-20 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                                errors.ingredients ? 'border-red-500' : ''
                            }`}
                        />
                    )}
                />
                {errors.ingredients && <span className="text-red-500 text-sm">{errors.ingredients.message}</span>}
            </div>

            {/* Instructions Field */}
            <div className="space-y-2">
                <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">
                    Instructions
                </label>
                <Controller
                    control={control}
                    name="instructions"
                    render={({ field }) => (
                        <textarea
                            id="instructions"
                            {...field}
                            value={field.value.join('\n')}
                            onChange={(e) => field.onChange(e.target.value.split('\n'))}
                            disabled={isLoading}
                            placeholder="Enter each instruction on a new line"
                            className={`w-full p-2 h-20 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                                errors.instructions ? 'border-red-500' : ''
                            }`}
                        />
                    )}
                />
                {errors.instructions && <span className="text-red-500 text-sm">{errors.instructions.message}</span>}
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    Image (Optional)
                </label>
                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        console.log(file);
                        if (file) {
                            setValue('image', file, { shouldValidate: true });
                            setPreviewImage(URL.createObjectURL(file));
                        }
                    }}
                    disabled={isLoading}
                    className="w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.image && <span className="text-red-500 text-sm">{errors.image.message}</span>}
                {previewImage && (
                    <img src={previewImage} alt="Recipe Preview" className="w-40 h-40 object-cover rounded-md mt-4" />
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isLoading}
                className={`flex justify-center items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
                {isLoading ? (
                    <ThreeDots height={20} width={20} color="#ffffff" ariaLabel="loading" visible={true} />
                ) : (
                    'Submit'
                )}
            </button>
        </form>
    );
};

export default RecipeFrom;
