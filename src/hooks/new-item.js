export const newItem = async (context) => {
  console.log(`Running hook newItem on ${context.path}.${context.method}`)
  console.log(context.data)
}
