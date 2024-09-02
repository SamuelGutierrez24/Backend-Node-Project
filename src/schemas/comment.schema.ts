import {object, string } from 'zod';

const commentSchema = object({
    text: string({required_error: "Text is required"})
})

export default commentSchema;