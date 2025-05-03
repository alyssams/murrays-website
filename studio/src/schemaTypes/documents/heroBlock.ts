import { defineField, defineType } from 'sanity'
import { MdOutlineFeaturedPlayList as icon } from 'react-icons/md'

export default defineType({
  name: 'heroBlock',
  title: 'Hero Block',
  type: 'document', // 🔁 so we can reuse via reference
  icon,
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'string',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'CTA URL',
      type: 'url',
    }),
    defineField({
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
