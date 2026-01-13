import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function RTE({ value, onChange, height }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="border-2 border-gray-300 dark:border-gray-600 rounded-md">
      <Editor
        key={isDark ? 'dark-editor' : 'light-editor'}  // 🔥 MAGIC LINE
        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
        value={value}
        onEditorChange={onChange}
        init={{
          height,

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
            "undo redo | forecolor backcolor | bold italic underline strikethrough | align | numlist bullist | blocks fontfamily fontsize | emoticons charmap | removeformat",

          toolbar_mode: 'sliding',

          // theme switch
          skin: isDark ? 'oxide-dark' : 'oxide',
          content_css: isDark ? 'dark' : 'default',

          content_style: `
            body {
              background-color: ${isDark ? '#1f2937' : '#e5e7eb'};
              color: ${isDark ? '#e5e7eb' : '#111827'};
              font-family: Inter, sans-serif;
            },
            a {
    color: ${isDark ? '#60a5fa' : '#2563eb'};
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
