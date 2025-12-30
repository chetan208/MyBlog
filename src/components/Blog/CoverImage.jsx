
import { useState } from "react";

export default function CoverImage(
    
){
    const [coverImage, setCoverImage] = useState(null);
    const [preview, setPreview] = useState(null);


    const handleImage = (file) => {
        if (!file) return;
        setCoverImage(file);
        setPreview(URL.createObjectURL(file));
    };
    return (
        <div
            className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer
                         hover:border-blue-500 transition order-2 lg:order-3"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
                e.preventDefault();
                handleImage(e.dataTransfer.files[0]);
            }}
            onClick={() =>
                document.getElementById("coverInput").click()
            }
        >
            <h2 className="font-semibold mb-2">
                Cover Image
            </h2>

            {preview ? (
                <>
                    <div className="border-2 relative" >
                        <button
                            onClick={() => setPreview(false)}
                            className="  absolute -top-3 -right-3 bg-white text-black w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-200"
                        >
                            ✕
                        </button>
                        <img
                            src={preview}
                            alt="Preview"
                            className="h-full w-full object-cover rounded-md z-5"
                        />
                    </div>
                </>
            ) : (
                <div className="h-44 flex flex-col items-center justify-center text-gray-400 text-sm">
                    <p>Drag & drop image</p>
                    <p className="text-xs mt-1">or click to choose</p>
                </div>
            )}

            <input
                id="coverInput"
                type="file"
                accept="image/*"
                className="hidden"
                disabled={preview}
                onChange={(e) =>
                    handleImage(e.target.files[0])
                }
            />
        </div>
    )
}