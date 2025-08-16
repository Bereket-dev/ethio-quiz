import { PlusIcon, XIcon } from 'lucide-react'
import { useState } from 'react'

function AddForm({ icon, fields, onCancel, onSave, onLoading, setOnLoading }) {
  const [formData, setFormData] = useState({})
  const [previewImg, setPreviewImg] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Form data', formData)
    setOnLoading(true)

    if (onSave) {
      await onSave(formData)
    }

    // Reset form after save
    setFormData({})
    setPreviewImg(null)
    setIsLoading(false)
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: files && files.length > 0 ? files[0] : value,
    }))

    if (files && files.length > 0) {
      setPreviewImg(URL.createObjectURL(files[0]))
    }
  }

  const removePreview = () => {
    setPreviewImg(null)
    setFormData((prev) => ({ ...prev, img_icon: null }))
  }

  return (
    <form
      encType="multipart/form-data"
      onSubmit={handleSubmit}
      className="w-full max-w-lg space-y-8 rounded-2xl bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl"
    >
      {/* Profile Image with Add Button */}
      <div className="flex justify-center">
        <div className="relative h-[120px] w-[120px] rounded-full bg-gray-50 p-1 shadow-inner">
          <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-gray-200 to-gray-400 text-4xl text-gray-700">
            {previewImg ? (
              <>
                <img
                  src={previewImg}
                  alt="preview"
                  className="h-full w-full rounded-full object-cover"
                />
                <button
                  type="button"
                  onClick={removePreview}
                  className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow hover:bg-red-600"
                  aria-label="Remove image"
                >
                  <XIcon size={14} />
                </button>
              </>
            ) : (
              icon
            )}
          </div>
          <label
            htmlFor="imageInput"
            className="bg-primary absolute right-2 bottom-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-white shadow-md transition-transform duration-200 hover:scale-110 hover:shadow-lg"
          >
            <PlusIcon className="h-5 w-5" />
          </label>
          <input
            type="file"
            name="img_icon"
            id="imageInput"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Dynamic Fields */}
      {fields?.map((field, index) => (
        <div
          key={index}
          className={fields.length <= 3 ? 'space-y-6' : 'space-y-3'}
        >
          <label
            htmlFor={`${field.type || 'input'}${index}`}
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            {field.label || 'Field'}
          </label>

          {field.type === 'textarea' ? (
            <textarea
              name={field.name || ''}
              id={`${field.type}${index}`}
              placeholder={field.placeholder || ''}
              required={field.required || false}
              rows="4"
              onChange={handleChange}
              value={formData[field.name] || ''}
              className="focus:border-primary focus:ring-primary/30 w-full resize-none rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 transition-all duration-200 outline-none focus:bg-white focus:ring-2"
            />
          ) : (
            <input
              type={field.type || 'text'}
              name={field.name || ''}
              id={`${field.type}${index}`}
              placeholder={field.placeholder || ''}
              required={field.required || false}
              onChange={handleChange}
              value={formData[field.name] || ''}
              className="focus:border-primary focus:ring-primary/30 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 transition-all duration-200 outline-none focus:bg-white focus:ring-2"
            />
          )}
        </div>
      ))}

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 pt-4">
        <button
          onClick={onCancel}
          type="button"
          className="rounded-xl border border-gray-300 px-5 py-2 text-gray-600 transition hover:bg-gray-100 hover:shadow-sm"
        >
          Cancel
        </button>
        {onLoading ? (
          <button
            type="button"
            disabled
            className="bg-primary flex items-center gap-2 rounded-xl px-5 py-2 text-white opacity-70 shadow-md"
          >
            <svg
              className="h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
              ></path>
            </svg>
            Saving...
          </button>
        ) : (
          <button
            type="submit"
            className="bg-primary hover:bg-primary/90 rounded-xl px-5 py-2 text-white shadow-md transition hover:shadow-lg"
          >
            Save
          </button>
        )}
      </div>
    </form>
  )
}

export default AddForm
