export default function ({ tags }, { randomNumber }) {
  const domain = tags.includes('integer')
    ? 'Integers'
    : 'RationalNumbers'
  let digits
  if (domain !== 'Integers') {
    digits = 2
  }
  const range = { fromInclusive: -100, toInclusive: 100, digits }
  const N = randomNumber.bind(undefined, domain, range)
  const a = N()
  const b = N()
  const aPlus2 = a + 2
  const bPlus5 = b + 5

  return {

  }
}