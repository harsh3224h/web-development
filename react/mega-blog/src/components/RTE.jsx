import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

export default function RTE({ name, control, defaultValue = "", label }) {
    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>
                {label}
            </label>}
            <Controller
                name={name || 'content'}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        apiKey='zvewogvcr49qnzxoog6be88xmcj8oqac4ze986kulqbihwip'
                        init={{
                            plugins: 'anchor autolink charmap codesample emoticons  link lists  searchreplace table visualblocks wordcount',
                            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                            branding: false,
                            promotion: false,
                        }}
                        initialValue="<h2>Untitled Post</h2><p>The world is waiting for your story. Start typing here...</p>"
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    )
}
