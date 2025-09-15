import * as Yup from 'yup'

const FILE_SIZE = 2 * 1024 * 1024 // 2MB
const SUPPORTED_FORMATS = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
]

const baseCategorySchema = Yup.object({
  title: Yup.string().required('A title is required'),
  description: Yup.string()
    .required('A description is required')
    .min(30, 'Minimum 30 characters')
    .max(300, 'Maximum 300 characters'),
  points: Yup.number('It should be number')
    .required('Points are required')
    .min(0, 'It should be positive number')
    .max(50, 'It should be lessthan 50'),
  timeAllowed: Yup.string()
    .required('Time required')
    .matches(/^([0-9]|[0-2][0-9]):([0-5][0-9])$/, 'Time must be 0:00 to 29:59'),
  kingdomId: Yup.string()
    .required('Kingdom is required')
    .matches(/^[0-9a-fA-F]{24}$/, 'Invalid Kingdom'),
})

export const addCategorySchema = baseCategorySchema.shape({
  img_icon: Yup.mixed()
    .required('An image is required!')
    .test('fileSize', 'File must be less than 2MB', (value) => {
      return value && value.size <= FILE_SIZE
    })
    .test('fileFormat', 'Unsupported Format', (value) => {
      return value && SUPPORTED_FORMATS.includes(value.type)
    }),
})

export const editCategorySchema = baseCategorySchema.shape({
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
