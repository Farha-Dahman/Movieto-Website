import * as Yup from 'yup'

export const regSchema = Yup.object({
    name: Yup.string().required("name is required").min(3, "min is 3 char").max(10, "max is 10 char"),
    email: Yup.string().required("email is required").email("not valid email"),
    password: Yup.string().required("password is required").matches(/^[A-Z][A-Za-z0-9]{3,20}$/ , "Your password should be start with capital latter, and must be at least 5 characters"),
    cPassword: Yup.string().required("Confirm password is required").oneOf([Yup.ref('password')], "Not match password"),
})

