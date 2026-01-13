import React from 'react'

function Appearence() {
  return (
     <div className="max-w-2xl bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-medium">Theme</h2>
            <label className="flex gap-2"><input type="radio" defaultChecked /> Light</label>
            <label className="flex gap-2"><input type="radio" /> Dark</label>
            <label className="flex gap-2"><input type="radio" /> System</label>
          </div>
  )
}

export default Appearence