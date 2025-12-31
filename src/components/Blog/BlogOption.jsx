import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function BlogActionMenu({ onEdit, onDelete }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* 3 dot button */}
      <button
        onClick={() => (
            setOpen(!open)
        )}
        className="p-2 rounded-full hover:bg-gray-100 transition"
      >
        <BsThreeDotsVertical className="text-xl text-gray-600" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border z-50">
          <button
            onClick={onEdit}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
          >
              <FaEdit/> Edit Blog
          </button>

          <button
            onClick={onDelete}
            className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-2"
          >
            <MdDelete/> Delete Blog
          </button>
        </div>
      )}
    </div>
  );
}
