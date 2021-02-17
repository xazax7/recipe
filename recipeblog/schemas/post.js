export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title (example: Gift-wrapping cookies)',
      type: 'string',
      validation: Rule => Rule.required().min(1).warning('Title too short.').error('Title too long or too short.')
    },
    {
      name: 'description',
      title: 'Short Description (example: How to create a nice shimmering presentation using cellophane)',
      type: 'string',
      validation: Rule => Rule.required().min(1).max(175).warning('Missing Description.').error('Description too long or too short.')
    },
    {
      name: 'slug',
      title: 'Slug (Just press the Generate button)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required().warning('Missing slug. (Press Generate)').error('Missing Field: Slug')
    },
    // {
    //   name: 'author',
    //   title: 'Author',
    //   type: 'reference',
    //   to: { type: 'author' },
    // },
    {
      name: 'mainImage',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.custom(name => {
        // if (name) {
        //   return true // Allow undefined values
        // }
        if (name) {
          return true
        }
        return name ? true : 'Missing image upload for Main Image'
      })
    },
    // {
    //   name: 'categories',
    //   title: 'Categories',
    //   type: 'array',
    //   of: [{ type: 'reference', to: { type: 'category' } }],
    // },
    // {
    //   name: 'publishedAt',
    //   title: 'Published at',
    //   type: 'datetime',
    // },
    //xxxxxxx
    {
      name: 'youtube',
      title: 'YouTube URL (example: https://www.youtube.com/watch?v=zeprXdBFjiw)',
      type: 'string'
    },
    //xxxxxxxxxx
    {
      name: 'prepTime',
      title: 'Prep time (example: 20 mins)',
      type: 'string'
    },
    {
      name: 'cookTime',
      title: 'Cook time (example: 40 mins)',
      type: 'string'
    },
    {
      name: 'servings',
      title: 'Servings',
      type: 'string'
    },
    {
      name: 'longerDesc',
      title: 'Longer description. (Shows before recipe/steps)',
      type: 'blockContent'
    },
    {
      name: 'type',
      title: 'Type (Options: breakfast, lunch, dinner, dessert, drinks. Can add multiple types, press enter after each type.) MUST BE LOWERCASE',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'ingredients',
      title: 'Ingredient List (Remember to use bullet points)',
      type: 'blockContent'
    },
    {
      name: 'body',
      title: 'Steps (Remember to put steps in a numbered list)',
      type: 'blockContent'
    },
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      })
    },
  },
}
