// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  itemDataValidator,
  itemPatchValidator,
  itemQueryValidator,
  itemResolver,
  itemExternalResolver,
  itemDataResolver,
  itemPatchResolver,
  itemQueryResolver
} from './items.schema.js'
import { ItemService, getOptions } from './items.class.js'
import { newItem } from '../../hooks/new-item.js'


export const itemPath = 'items'
export const itemMethods = ['find', 'get', 'create', 'patch', 'remove']

export * from './items.class.js'
export * from './items.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const item = (app) => {
  // Register our service on the Feathers application
  app.use(itemPath, new ItemService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: itemMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(itemPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(itemExternalResolver), schemaHooks.resolveResult(itemResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(itemQueryValidator), schemaHooks.resolveQuery(itemQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(itemDataValidator), schemaHooks.resolveData(itemDataResolver)],
      patch: [schemaHooks.validateData(itemPatchValidator), schemaHooks.resolveData(itemPatchResolver)],
      remove: []
    },
    after: {
      all: [],
      create: [newItem]
    },
    error: {
      all: []
    }
  })
}
