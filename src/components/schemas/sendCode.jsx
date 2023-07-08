import * as Yup from 'yup'

export const sendCodeSchema = Yup.object({
    email: Yup.string().required("email is required").email("not valid email"),
})

