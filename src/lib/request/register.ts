import Joi from 'joi';

export const registerRequest = Joi.object({
	name: Joi.string().min(3).max(255).required(),

	password: Joi.string().min(6).max(100).required(),

	email: Joi.string().max(255).email().required()
});
