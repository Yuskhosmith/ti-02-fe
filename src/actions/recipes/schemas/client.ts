import { z } from 'zod';

export const createRecipeDataSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    ingredients: z.array(z.string()).min(1, 'At least one ingredient is required'),
    instructions: z.array(z.string()).min(1, 'At least one instruction is required'),
    image: z
        .instanceof(File)
        .optional()
        .refine((file) => !file || file.size < 1 * 1024 * 1024, {
            message: 'Image size must be less than 1MB',
        }),
});

export type CreateRecipeData = z.infer<typeof createRecipeDataSchema>;
