import React from 'react'

function Danger() {
  return (
     <div className="max-w-2xl bg-red-50 dark:bg-red-950 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-medium text-red-600">Danger Zone</h2>
            <button className="bg-red-600 text-white px-5 py-2 rounded-lg">Delete Account</button>
          </div>
  )
}

export default Danger