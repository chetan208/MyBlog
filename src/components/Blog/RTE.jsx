import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function RTE({ value, onChange, height }) {

    return (
        <div className='border-2 border-gray-300 dark:border-gray-600 rounded-md'>
            <Editor
                apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                value={value}
                onEditorChange={onChange}
                init={{
                    height: height,

                    // Plugins
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

                    // Toolbar
                    toolbar:
                        "undo redo | forecolor backcolor | bold italic underline strikethrough | align lineheight | checklist numlist bullist indent outdent | blocks fontfamily fontsize | emoticons charmap | removeformat",
                    toolbar_mode: 'sliding',

                    // Dark mode skin
                    skin: 'oxide-dark',          // Dark UI
                    content_css: 'dark',         // Dark content background

                    // Optional: Tailwind styles inside editor
                    content_style: `
                        body { 
                            @apply bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-100;
                        }
                        p, h1, h2, h3, h4, h5, h6 { 
                            @apply text-gray-100 dark:text-gray-100;
                        }
                        a { 
                            @apply text-blue-500 dark:text-blue-400 underline;
                        }
                    `,

                    branding: false,
                    promotion: false,
                    menubar: false,
                    statusbar: true,
                }}
            />
        </div>
    );
}
