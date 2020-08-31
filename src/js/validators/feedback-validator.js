import * as yup from "yup";

export const create_feedback = yup.object().shape({
  reason: yup
    .string()
    .min(6)
    .max(20)
    .matches(/^([a-zA-Z]+)$/, {
      message: "please follow the feedback model instrctions",
    })
    .oneOf(["suggestion", "problem", "error", "message"])
    .required(),
  email: yup.string().email().required(),
  message: yup
    .string()
    .min(30)
    .max(800)
    .matches(/^([a-zA-Z\u0600-\u06FF 1-9]+)$/, {
      message: "please follow the feedback model instrctions",
    })
    .required(),
});

export const update_feedback = yup.object().shape({
  id: yup.string().required(),
  reason: yup
    .string()
    .min(6)
    .max(20)
    .matches(/^([a-zA-Z]+)$/, {
      message: "please follow the feedback model instrctions",
    })
    .oneOf(["suggestion", "problem", "error", "message"]),
  email: yup.string().email(),
  message: yup
    .string()
    .min(30)
    .max(800)
    .matches(/^([a-zA-Z\u0600-\u06FF 1-9]+)$/, {
      message: "please follow the feedback model instrctions",
    }),
});
export const delete_feedback = yup.object().shape({
  id: yup.string().required(),
});
