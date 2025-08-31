import { isValidSearch } from './validator'

describe('isValidSearch', () => {
  test.each([
    ['Hello', true],
    ['#hello', false],
    ['$', false],
  ])('Test for %s is %s', (input, expected) => {
    expect(isValidSearch(input)).toBe(expected)
  })
})
