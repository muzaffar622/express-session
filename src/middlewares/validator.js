import { Joi } from "express-validation";

export const decodeValid = {
  query: Joi.object({
    search: Joi.string().required()
  })
};

export const encodeValid = {
  body: Joi.object({
    data: Joi.string().required()
  })
};

export const destroyValid = {
  body: Joi.object({
    data: Joi.string().required()
  })
};
