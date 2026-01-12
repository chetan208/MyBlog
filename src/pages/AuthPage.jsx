
import login from '../assets/login.png'
import { Outlet } from 'react-router-dom'

function AuthPage() {
  return (
    <div
      className="
        min-h-[90vh] flex items-center justify-center
        bg-gray-50 dark:bg-gray-900
        px-4
      "
    >
      {/* MAIN CARD */}
      <div
        className="
          w-full max-w-5xl
          min-h-[80vh]
          flex flex-col md:flex-row     /* 📱 mobile: column | 💻 desktop: row */
          rounded-2xl overflow-hidden
          bg-white dark:bg-gray-800
          shadow-2xl dark:shadow-black/50
        "
      >
        {/* IMAGE SECTION */}
        <div
          className="
            w-full md:w-1/2
            min-h-[280px] md:min-h-full
            flex items-center justify-center
            bg-center bg-contain bg-no-repeat
            dark:opacity-90
          "
          style={{ backgroundImage: `url(${login})` }}
        />


        {/* FORM SECTION */}
        
        <Outlet/>


      </div>
    </div>
  )
}

export default AuthPage
