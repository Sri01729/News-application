// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const itemSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String(),
    quantity: Type.Number(),
    headline: Type.String(),        // New field: headline
    snippet: Type.String(),         // New field: snippet
    imageURL: Type.String(),        // New field: imageURL
    fullArticleLink: Type.String()  // New field: fullarticlelink
  },
  { $id: 'Item', additionalProperties: false }
)
export const itemValidator = getValidator(itemSchema, dataValidator)
export const itemResolver = resolve({})

export const itemExternalResolver = resolve({})

// Schema for creating new entries
export const itemDataSchema = Type.Pick(itemSchema, ['text', 'quantity', 'headline', 'snippet', 'imageURL', 'fullArticleLink'], {
  $id: 'ItemData'
})
export const itemDataValidator = getValidator(itemDataSchema, dataValidator)
export const itemDataResolver = resolve({})

// Schema for updating existing entries
export const itemPatchSchema = Type.Partial(itemSchema, {
  $id: 'ItemPatch'
})
export const itemPatchValidator = getValidator(itemPatchSchema, dataValidator)
export const itemPatchResolver = resolve({})

// Schema for allowed query properties
export const itemQueryProperties = Type.Pick(itemSchema, ['id', 'text', 'quantity', 'headline', 'snippet', 'imageURL', 'fullArticleLink'])
export const itemQuerySchema = Type.Intersect(
  [
    querySyntax(itemQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const itemQueryValidator = getValidator(itemQuerySchema, queryValidator)
export const itemQueryResolver = resolve({})
