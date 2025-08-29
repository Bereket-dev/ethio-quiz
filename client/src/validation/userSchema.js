import * as Yup from 'yup'

const baseUserSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must not exceed 20 characters')
    .required('Username is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/,
      'Password must contain an uppercase letter, lowercase letter, number and special character',
    ),
})

export const loginSchema = Yup.object({
  email: baseUserSchema.fields.email,
  password: Yup.string().required('Password is required'),
})

export const signUpSchema = Yup.object({
  email: baseUserSchema.fields.email,
  username: baseUserSchema.fields.username,
  password: baseUserSchema.fields.password,
})
