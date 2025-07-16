// src/lib/logSchemas.ts
export type FieldDef = {
  name: string
  label: string
  inputType: 'text' | 'number' | 'date' | 'textarea' | 'tags' // etc
}

export type LogTypeSchema = {
  // discriminator
  type: string
  // fields to collect under log_type_data
  dataFields: FieldDef[]
}

export const logSchemas: Record<string, LogTypeSchema> = {
  movie: {
    type: 'movie',
    dataFields: [
      { name: 'rating',    label: 'Rating (1–10)',  inputType: 'number' },
      { name: 'genre',     label: 'Genre',           inputType: 'text'   },
      { name: 'watched_on',label: 'Watched on',      inputType: 'date'   },
    ],
  },
  // later you can just add:
  // workout: { type: 'workout', dataFields: [ … ] },
}
