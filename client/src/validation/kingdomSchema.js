import * as Yup from 'yup'

const FILE_SIZE = 1 * 1024 * 1024 // 1MB
const SUPPORTED_FORMATS = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
]

const baseKingdomSchema = Yup.object({
  title: Yup.string().required('A title is required!'),
  description: Yup.string()
    .min(50, 'Minimum 50 characters')
    .max(200, 'Maximum 200 characters')
    .required('A description is required!'),
})

export const createKingdomSchema = baseKingdomSchema.shape({
  img_icon: Yup.mixed()
    .required('An image is required!')
    .test('fileSize', 'File too large', (value) => {
      return value && value.size <= FILE_SIZE
    })
    .test('fileFormat', 'Unsupported Format', (value) => {
      return value && SUPPORTED_FORMATS.includes(value.type)
    }),
})

export const editKingdomSchema = baseKingdomSchema.shape({
  img_icon: Yup.mixed()
    .nullable()
    .test('fileSize', 'File too large', (value) => {
      if (!value || typeof value === 'string') return true
      return value.size <= FILE_SIZE
    })
    .test('fileFormat', 'File larger than 1MB', (value) => {
      if (!value || typeof value === 'string') return true
      return SUPPORTED_FORMATS.includes(value.type)
    }),
})
