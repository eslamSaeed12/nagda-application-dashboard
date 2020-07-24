export const wrapper = ({ ...args }, validator) => {
  const context = {
    errors: null,
    values: null,
    message: null,
  };

  try {
    const validation = validator.validateSync(
      { ...args },
      { abortEarly: false, stripUnknown: true }
    );

    context.values = validation;
    context.message = "succssefully validated";
  } catch (e) {
    if (e.name === "ValidationError") {
      // context.errors = e.
      context.errors = e.errors;
      context.message = e.message;
    }
  }

  return context;
};
