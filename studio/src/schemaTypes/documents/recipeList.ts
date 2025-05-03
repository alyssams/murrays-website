import { defineField, defineType } from 'sanity'
import { MdList as icon } from 'react-icons/md'

export default defineType({
  name: 'recipeList',
  title: 'Recipe List',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'recipes',
      title: 'Recipes',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'recipe' }]
        }
      ],
      validation: Rule => Rule.min(1).error('Add at least one recipe')
    }),
    defineField({
      name: 'campaignTag',
      title: 'Campaign Tag (optional)',
      type: 'string',
      description: 'Used to group this list by promo or campaign'
    }),
  ]
})
