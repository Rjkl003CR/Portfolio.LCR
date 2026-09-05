import {defineField, defineType} from 'sanity'

export const leadershipType = defineType({
  name: 'leadership',
  title: 'Leadership Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Role Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'period',
      title: 'Time Period',
      type: 'string',
      description: 'e.g. "2025 - Present"',
    }),
    defineField({
      name: 'organization',
      title: 'Organization',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
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
    select: { title: 'title', subtitle: 'organization' },
  },
})
