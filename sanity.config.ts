import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schema} from './sanity/schemaTypes'
import {projectId, dataset} from './sanity/env'

const isDev = process.env.NODE_ENV === 'development'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool(),
    // Vision GROQ tool — only loaded in development to keep production bundle lean
    ...(isDev ? [visionTool({defaultApiVersion: '2024-01-01'})] : []),
  ],
})
