import * as yup from "yup";

export const create_admin = yup.object({
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

  role: yup.string().length(24).required(),
});

export const update_admin = yup.object({
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
  role: yup.string().length(24),
});

export const delete_admin = yup.object({
  id: yup.string().required(),
});
