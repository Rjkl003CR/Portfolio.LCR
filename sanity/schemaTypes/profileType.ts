import {defineField, defineType} from 'sanity'

export const profileType = defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  // Singleton — only one profile document should exist
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'greeting',
      title: 'Greeting Text',
      type: 'string',
      description: 'e.g. "Hello, I\'m"',
      initialValue: "Hello, I'm",
    }),
    defineField({
      name: 'title',
      title: 'Professional Title',
      type: 'string',
      description: 'e.g. "Full-Stack Developer & Creative Thinker"',
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Your profile/headshot photo',
    }),
    defineField({
      name: 'profileImageUrl',
      title: 'Profile Image URL (External)',
      type: 'url',
      description: 'Alternative: external URL for profile image (e.g. Google Drive). Used if no uploaded image.',
    }),
    defineField({
      name: 'bio',
      title: 'Bio Paragraphs',
      type: 'array',
      of: [{type: 'text'}],
      description: 'Each item becomes a paragraph in the About section. You can use basic formatting.',
    }),
    defineField({
      name: 'contactBlurb',
      title: 'Contact Section Blurb',
      type: 'text',
      description: 'Short text shown in the contact section, e.g. "I am currently seeking..."',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. "Moratuwa, Sri Lanka"',
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'resumeUrl',
      title: 'Resume / CV URL',
      type: 'url',
      description: 'Link to downloadable CV (e.g. Google Drive link)',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'title' },
  },
})
