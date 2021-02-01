export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title (example: Gift-wrapping cookies)',
      type: 'string',
      validation: Rule => Rule.required().min(5).max(25).warning('Missing Title.').error('Missing Field: Title')
    },
    {
      name: 'description',
      title: 'Description (example: How to create a nice shimmering presentation using cellophane)',
      type: 'string',
      validation: Rule => Rule.required().min(5).max(30).warning('Missing Description.').error('Missing Field: Description')
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
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    },
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
      name: 'ccc',
      title: 'ccc',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'ingredients',
      title: 'Ingredient List (Make sure to use Bullet-points. example:    • 1 tsp sugar)',
      type: 'ingredientsContent'
    },
    {
      name: 'body',
      title: 'Steps (Make sure to click the button so it uses Numbers. example: 1. Give Draco a treat)',
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
