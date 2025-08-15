import React from 'react'

function QuickActions({ actions = [] }) {
  return (
    <div className="flex h-full w-full flex-col rounded-2xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-2xl">
      {/* Header */}
      <h3 className="flex items-center justify-center border-b border-gray-100 bg-white/90 px-5 py-3 text-lg font-semibold text-gray-700 backdrop-blur-md">
        Quick Actions
      </h3>

      {/* Actions Grid */}
      <div className="flex-1 px-5 py-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              aria-label={action.label}
              className="group flex min-h-44 flex-col items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-4 text-sm font-medium text-gray-700 shadow-sm transition-all duration-300 hover:border-blue-400 hover:from-blue-500 hover:to-blue-600 hover:text-white hover:shadow-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <div className="flex items-center justify-center rounded-full bg-white p-3 shadow-md transition-all duration-300 group-hover:bg-blue-400 group-hover:text-white">
                {action.icon}
              </div>
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default QuickActions
