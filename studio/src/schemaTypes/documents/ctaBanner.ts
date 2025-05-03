import { defineField, defineType } from 'sanity'
import { MdCampaign as icon } from 'react-icons/md'

export default defineType({
  name: 'ctaBanner',
  title: 'CTA Banner',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'text',
      title: 'Banner Text',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
    }),
    defineField({
      name: 'buttonUrl',
      title: 'Button URL',
      type: 'url',
    }),
    defineField({
      name: 'audienceTag',
      title: 'Audience Tag (optional)',
      type: 'string',
      description: 'Used for targeting/personalization rules (e.g. first-time, returning)'
    }),
  ],
})
