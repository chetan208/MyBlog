import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function RTE({ value, onChange, height }) {
    
    return (
        <div
            className='border-2 border-gray-300 rounded-md'
        >
            <Editor
                apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                value={value}
                onEditorChange={onChange}
                init={{
                    height: height,

                
                    plugins: [
                        'anchor',
                        'autolink',
                        'charmap',
                        'codesample',
                        'emoticons',
                        'link',
                        'lists',
                        'media',
                        'searchreplace',
                        'table',
                        'visualblocks',
                        'wordcount',
                    ],

                    toolbar:
                        "undo redo | forecolor backcolor |bold italic underline strikethrough |align lineheight | checklist numlist bullist indent outdent | blocks fontfamily fontsize |emoticons charmap | removeformat",                          // Row 1: Undo/Redo + Colors


                    toolbar_mode: 'sliding',
               

                    branding: false,      
                    promotion: false,      
                    menubar: false,
                    statusbar: true,
                }
                }
                    />
        </div>
    );
}
