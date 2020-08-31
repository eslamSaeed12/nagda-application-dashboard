import * as yup from "yup";

export const create_city = yup.object({
  title: yup
    .string()
    .min(6)
    .max(50)
    .matches(/^([a-zA-Z\u0600-\u06FF -]+)$/, {
      message: "please follow cicty model instrcutions",
    })
    .required(),
  stations: yup.array().of(yup.string().length(24).required()).default([]),
});
export const update_city = yup.object({
  id: yup.string().length(24).required(),
  title: yup
    .string()
    .min(6)
    .max(50)
    .matches(/^([a-zA-Z\u0600-\u06FF -]+)$/, {
      message: "please follow cicty model instrcutions",
    }),
  stations: yup.array().of(yup.string().length(24).optional()).default([]),
});
export const find_city = yup.object({
  id: yup.string().length(24).required(),
});
export const delete_city = yup.object({
  id: yup.string().length(24).required(),
});
