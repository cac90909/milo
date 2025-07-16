// src/components/LogForm.tsx
"use client"

import React, { FormEvent, useState, ChangeEvent } from 'react'
import { logSchemas, FieldDef } from '@/lib/logSchemas'

interface LogFormProps {
  onSubmit: (payload: any) => void
}

// Helper to render an input based on FieldDef
function renderField(
  field: FieldDef,
  value: any,
  onChange: (val: any) => void
) {
  switch (field.inputType) {
    case 'number':
      return (
        <input
          type="number"
          placeholder={field.label}
          value={value ?? ''}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(Number(e.target.value))}
          className="border rounded px-2 py-1 w-full"
        />
      )

    case 'date':
      return (
        <input
          type="date"
          placeholder={field.label}
          value={value ?? ''}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          className="border rounded px-2 py-1 w-full"
        />
      )

    case 'textarea':
      return (
        <textarea
          placeholder={field.label}
          value={value ?? ''}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
          className="border rounded px-2 py-1 w-full h-24"
        />
      )

    case 'tags':
      return (
        <input
          placeholder={field.label}
          value={(value as string[]).join(', ')}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value.split(',').map(t => t.trim()))
          }
          className="border rounded px-2 py-1 w-full"
        />
      )

    default: // text
      return (
        <input
          type="text"
          placeholder={field.label}
          value={value ?? ''}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          className="border rounded px-2 py-1 w-full"
        />
      )
  }
}

export default function LogCreationForm({ onSubmit }: LogFormProps) {
  // base fields
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [tags, setTags] = useState<string[]>([])

  // type & type-specific data
  const [logType, setLogType] = useState<keyof typeof logSchemas>('movie')
  const [logTypeData, setLogTypeData] = useState<Record<string, any>>({})

  const schema = logSchemas[logType]

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit({
      log_type: schema.type,
      title,
      text,
      tags,
      log_type_data: logTypeData,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Log type selector */}
      <div>
        <label htmlFor="logType" className="block font-medium">
          Type:
        </label>
        <select
          id="logType"
          value={logType}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            const t = e.target.value as keyof typeof logSchemas
            setLogType(t)
            setLogTypeData({})
          }}
          className="mt-1 border rounded px-2 py-1"
        >
          {Object.keys(logSchemas).map(key => (
            <option key={key} value={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Base fields */}
      <div>
        <label htmlFor="title" className="block font-medium">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          className="mt-1 border rounded px-2 py-1 w-full"
        />
      </div>

      <div>
        <label htmlFor="text" className="block font-medium">
          Text
        </label>
        <textarea
          id="text"
          value={text}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
          className="mt-1 border rounded px-2 py-1 w-full h-24"
        />
      </div>

      <div>
        <label htmlFor="tags" className="block font-medium">
          Tags (comma-separated)
        </label>
        <input
          id="tags"
          type="text"
          value={tags.join(', ')}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTags(e.target.value.split(',').map(t => t.trim()))
          }
          className="mt-1 border rounded px-2 py-1 w-full"
        />
      </div>

      {/* Type-specific fields */}
      <div className="space-y-4">
        {schema.dataFields.map(field => (
          <div key={field.name}>
            {renderField(
              field,
              logTypeData[field.name],
              val => setLogTypeData(prev => ({ ...prev, [field.name]: val }))
            )}
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Create Log
      </button>
    </form>
  )
}
