import * as yup from "yup";

export const create_faq = yup.object({
  title: yup
    .string()
    .min(30)
    .max(255)
    .matches(/^([a-zA-z\u0600-\u06FF ]+)$/, {
      message: "please follow the faq model instrcutions",
    })
    .required(),
  description: yup.string().max(2000).required(),
});

export const update_faq = yup.object({
  id: yup.string().required(),
  title: yup
    .string()
    .min(30)
    .max(255)
    .matches(/^([a-zA-z\u0600-\u06FF ]+)$/, {
      message: "please follow the faq model instrcutions",
    }),
  description: yup.string().min(30).max(2000),
});

export const delete_faq = yup.object({
  id: yup.string().required(),
});
