import * as Yup from 'yup'

export const questionSchema = Yup.object().shape({
  categoryId: Yup.string()
    .required('Please select a category')
    .matches(/^[0-9a-fA-F]{24}$/, 'Invalid category ID format'),

  questionText: Yup.string().trim().required('Please enter the question text'),

  options: Yup.array()
    .of(Yup.string().trim().required('Option cannot be empty'))
    .min(2, 'At least two options are required')
    .max(6, 'A maximum of six options are allowed')
    .test('unique-options', 'Options must be unique', (options) => {
      if (!options) return false
      const texts = options
        .filter((opt) => typeof opt === 'string') // filter out undefined
        .map((opt) => opt.toLowerCase())
      return new Set(texts).size === texts.length
    }),

  correctAnswer: Yup.string()
    .required('Please select the correct answer')
    .test(
      'correctAnswer-in-options',
      'Correct answer must match one of the options',
      function (value) {
        const { options } = this.parent
        if (!options || options.length === 0) return false
        return options.some((opt) => opt === options[value])
      },
    ),
})
