const Joi = require('@hapi/joi');

const itemValidation = data  => {
  const schema = Joi.object({
   category : Joi.string().min(3).required(),
    label: Joi.string(),
    position: Joi.string().required(),
    wrapping: Joi.string().required(),
    text: Joi.string().min(5).required(),
    createdAt: Joi.date(),
    modifiedAt: Joi.date()
  });

  //Validate data against schema
  return schema.validate(data);
};

module.exports = { itemValidation };