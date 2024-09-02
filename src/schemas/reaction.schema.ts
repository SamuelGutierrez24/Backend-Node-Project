import {object, string } from 'zod';

const reactionSchema = object({
    text: string({required_error: "Text is required"})
})

export default reactionSchema;