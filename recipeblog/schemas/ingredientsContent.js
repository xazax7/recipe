/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export default {
    title: 'Ingredients',
    name: 'ingredientsContent',
    type: 'array',
    of: [
        {
            title: 'Block',
            type: 'block',
            styles: [],
            lists: [{ title: 'Bullet', value: 'bullet' }]
            // Marks let you mark up inline text in the block editor.
        },
    ],
}
