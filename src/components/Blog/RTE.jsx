import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function RTE({ value, onChange, height }) {
    
    return (
        <div
            className='border-2 border-gray-300 rounded-md'
        >
            <Editor
                apiKey="2silmu89knbsswole021s5ih8pt9m0nmaa9oetbciy92531e"
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
