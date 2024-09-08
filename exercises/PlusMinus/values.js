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
  
  return {
    a: N(),
    b: N(),
  }
}