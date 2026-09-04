import {defineField, defineType} from 'sanity'

export const educationType = defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
    defineField({
      name: 'degree',
      title: 'Degree / Qualification',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'e.g. "BSc (Hons) in Information Technology"',
    }),
    defineField({
      name: 'school',
      title: 'School / University',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year / Period',
      type: 'string',
      description: 'e.g. "Expected 2028" or "2022"',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'detail',
      title: 'Additional Detail',
      type: 'string',
      description: 'e.g. grades, Z-score, number of A\'s',
    }),
    defineField({
      name: 'active',
      title: 'Currently Active?',
      type: 'boolean',
      description: 'Highlight this entry as the current/active education',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (most recent first)',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: { title: 'degree', subtitle: 'school' },
  },
})
