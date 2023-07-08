import * as Yup from 'yup'

export const forgetPasswordSchema = Yup.object({
    email: Yup.string().required("email is required").email("not valid email"),
    code: Yup.string().required("code is required"),
    newPassword: Yup.string().required("password is required").matches(/^[A-Z][A-Za-z0-9]{3,20}$/ , "Your password should be start with capital latter, and must be at least 5 characters"),
})

