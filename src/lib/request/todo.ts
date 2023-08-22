import Joi from 'joi';

export const todoSaveRequest = Joi.object({
	title: Joi.string().min(3).max(255).required(),

	description: Joi.string().max(255).not().required(),

	order: Joi.number().required()
});
