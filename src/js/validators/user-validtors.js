import * as yup from "yup";

export const create_user = yup.object({
  username: yup
    .string()
    .min(8)
    .max(18)
    .matches(/^([A-Z|a-z+]+(_| )+([A-Z|a-z|1-9])+)$/, {
      message: "please follow user model instructions",
    })
    .required(),

  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8)
    .max(18)
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, {
      message: "please follow user model instructions",
    })
    .required(),
  usage: yup.object({
    web: yup.number().default(0),
    mobile: yup.number().default(0),
  }),
});

export const update_user = yup.object({
  id: yup.string().required(),
  username: yup
    .string()
    .min(8)
    .max(18)
    .matches(/^([A-Z|a-z+]+(_| )+([A-Z|a-z|1-9])+)$/, {
      message: "please follow user model instructions",
    }),
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8)
    .max(18)
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, {
      message: "please follow user model instructions",
    }),
  usage: yup.object({
    web: yup.number(),
    mobile: yup.number(),
  }),
});

export const delete_user = yup.object({
  id: yup.string().required(),
});
