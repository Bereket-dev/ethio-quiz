const categoryFormFields = [
  {
    type: 'text',
    label: 'Category Name',
    name: 'title',
    placeholder: 'Enter category name',
    required: true,
  },
  {
    type: 'textarea',
    label: 'Category Description',
    name: 'description',
    placeholder: 'Enter category description',
    required: true,
  },
  {
    type: 'number',
    label: 'question point',
    name: 'points',
    placeholder: 'Points',
    required: true,
  },
  {
    type: 'text',
    label: 'time allowed',
    name: 'timeAllowed',
    placeholder: 'mm:ss',
    required: true,
  },
  { type: 'color', label: 'color of category', name: 'color', required: true },
  {
    type: 'select',
    label: 'kingdom of category',
    name: 'kingdomId',
    required: true,
  },
]

export default categoryFormFields
