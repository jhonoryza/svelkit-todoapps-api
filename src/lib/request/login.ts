import Joi from 'joi';

export const loginRequest = Joi.object({
	email: Joi.string().max(255).email().required(),
	password: Joi.string().min(6).max(100).required(),
});
