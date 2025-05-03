import { defineField, defineType } from 'sanity'
import { GiDogBowl as icon } from 'react-icons/gi' // 🐾 Optional: fun dog-related icon

export default defineType({
  name: 'recipe',
  title: 'Recipe',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Recipe Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
    }),
    defineField({
      name: 'ingredients',
      title: 'Ingredients',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'portionSize',
      title: 'Portion Size',
      type: 'string',
    }),
    defineField({
      name: 'price',
      title: 'Price (USD)',
      type: 'number',
    }),
    defineField({
      name: 'image',
      title: 'Recipe Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'available',
      title: 'Available?',
      type: 'boolean',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      price: 'price',
      portion: 'portionSize',
    },
    prepare({ title, media, price, portion }) {
      return {
        title,
        subtitle: `${portion || ''}${price ? ` - $${price}` : ''}`,
        media,
      }
    },
  },
})
