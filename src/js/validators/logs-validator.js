import * as yup from "yup";

export const deleteLog = yup.object({
  id: yup.string().required().length(24),
});
