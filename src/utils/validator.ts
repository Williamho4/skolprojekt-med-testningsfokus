export function isValidSearch(input: string | undefined): boolean {
  if (!input) return false
  const regex = /^[a-zA-Z0-9 _-]+$/
  return regex.test(input)
}
