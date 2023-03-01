
export const basicStringType = { type: String, required: true, minLength: 3, maxLength: 500 }
export const defaultSchemaOptions = { timestamps: true, toJSON: { virtuals: true } }