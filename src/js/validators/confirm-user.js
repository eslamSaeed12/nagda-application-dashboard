import * as yup from "yup";

const schema = yup.object().shape({
  password: yup
    .string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, {
      message: "password not follow the instructions",
    })
    .min(8)
    .max(18)
    .required(),
  id: yup.string().required(),
});

export default schema;
