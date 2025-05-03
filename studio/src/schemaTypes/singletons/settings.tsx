import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

export const settings = defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "navigation",
      title: "Main Navigation",
      type: "array",
      description: "List of links for the site header",
      of: [
        defineField({
          name: "link",
          title: "Link",
          type: "object",
          fields: [
            {
              name: "title",
              title: "Link Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "url",
              title: "URL",
              type: "string",
              validation: (Rule) => Rule.required().uri({
                allowRelative: true,
                scheme: ["https", "http"],
              }),
              description: "Can be an internal path like /about or a full URL",
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description: "Upload your site logo",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "defaultSeoTitle",
      title: "Default SEO Title",
      type: "string",
    }),
    defineField({
      name: "defaultMetaDescription",
      title: "Default Meta Description",
      type: "text",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
    }),
    defineField({
      name: "contactPhone",
      title: "Contact Phone",
      type: "string",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
      };
    },
  },
});
