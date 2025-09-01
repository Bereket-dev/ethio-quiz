import * as Yup from 'yup'

const FILE_SIZE = 2 * 1024 * 1024 // 2MB
const SUPPORTED_FORMATS = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
]

const categorySchema = Yup.object({
  title: Yup.string().required('A title is required'),
  description: Yup.string()
    .min(30, 'Minimum 30 characters')
    .max(300, 'Maximum 300 characters')
    .required('A description is required'),
  points: Yup.number('It should be number')
    .min(0, 'It should be positive number')
    .max(50, 'It should be lessthan 50')
    .required('Points are required'),
  timeAllowed: Yup.string()
    .matches(/^\d{2}:\d{2}/, 'Time must be in mm:ss format')
    .test('is-valid-time', 'Time must be between 00:00 to 29:59', (value) => {
      if (!value) return false
      const [minutes, seconds] = value.split(':').map(Number)
      return minutes >= 0 && minutes <= 29 && seconds >= 0 && seconds <= 59
    })
    .required('A time is required'),
  img_icon: Yup.mixed()
    .required('An image is required!')
    .test('fileSize', 'File must be less than 2MB', (value) => {
      return value && value.size <= FILE_SIZE
    })
    .test('fileFormat', 'Unsupported Format', (value) => {
      return value && SUPPORTED_FORMATS.includes(value.type)
    }),
})

export default categorySchema
