import * as yup from "yup";

export const role_create = yup.object({
  title: yup
    .string()
    .min(4)
    .max(255)
    .matches(/^([a-zA-z ]+)$/, {
      message: "title not follow the instructions",
    })
    .required(),
});

export const role_update = yup.object({
  id: yup.string().required(),
  title: yup
    .string()
    .min(4)
    .max(30)
    .matches(/^([a-zA-z ]+)$/, {
      message: "title not follow the instructions",
    }),
});
export const role_delete = yup.object({
  id: yup.string().required(),
});
