import * as Yup from 'yup'

export const passwordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, 'Password must be atleas 8 characters!')
    .required('New password is required!'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match!')
    .required('Confirm password is required!'),
})

export const emailSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email!').required('Email is required!'),
})
