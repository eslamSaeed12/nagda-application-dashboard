import * as yup from "yup";

export const create_station = yup.object({
  title: yup
    .string()
    .min(8)
    .max(50)
    .matches(/^([a-zA-z\u0600-\u06FF 1-9]+)$/, {
      message: "please follow the station model instrcutions",
    })
    .required(),
  location: yup
    .object({
      type: yup.string().default("Point").required(),
      coordinates: yup
        .array()
        .min(2)
        .max(2)
        .of(yup.number().required())
        .required(),
    })
    .required(),
});
export const update_station = yup.object({
  id: yup.string().required(),
  title: yup
    .string()
    .min(8)
    .max(50)
    .matches(/^([a-zA-z\u0600-\u06FF 1-9]+)$/, {
      message: "please follow the station model instrcutions",
    }),
  location: yup.object({
    type: yup.string().default("Point").required(),
    coordinates: yup
      .array()
      .min(2)
      .max(2)
      .of(yup.number().required())
      .required(),
  }),
});
export const delete_station = yup.object({
  id: yup.string().required(),
});
