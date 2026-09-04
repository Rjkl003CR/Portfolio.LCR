import {defineField, defineType} from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle / Tagline',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Date / Period',
      type: 'string',
      description: 'e.g. Aug. 2025',
    }),
    defineField({
      name: 'bullets',
      title: 'Key Bullet Points',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Key achievements or feature descriptions',
    }),
    defineField({
      name: 'tech',
      title: 'Technologies',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'image',
      title: 'Project Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'link',
      title: 'Project Link',
      type: 'url',
    }),
    defineField({
      name: 'github',
      title: 'GitHub Link',
      type: 'url',
    }),
  ],
})
