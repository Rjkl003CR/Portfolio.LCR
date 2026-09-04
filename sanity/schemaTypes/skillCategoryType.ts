import {defineField, defineType} from 'sanity'

export const skillCategoryType = defineType({
  name: 'skillCategory',
  title: 'Skill Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Category Title',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'e.g. "Languages & Frameworks", "Data & Cloud"',
    }),
    defineField({
      name: 'iconKey',
      title: 'Icon Key',
      type: 'string',
      description: 'Identifier for the icon: "code", "database", "wrench", or "book"',
      options: {
        list: [
          {title: 'Code (Languages)', value: 'code'},
          {title: 'Database (Data)', value: 'database'},
          {title: 'Wrench (Dev Tools)', value: 'wrench'},
          {title: 'Book (Analytical)', value: 'book'},
          {title: 'Server', value: 'server'},
        ],
      },
    }),
    defineField({
      name: 'items',
      title: 'Skills',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of skill names in this category',
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
    select: { title: 'title', subtitle: 'iconKey' },
  },
})
