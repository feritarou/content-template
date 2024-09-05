export default function ({ tags }) {
  let n = Array(2).fill(0).map(() => Math.random() * 100)
  if (tags.includes('integer')) {
    for (let i = 0; i < 2; i++) {
      n[i] = Math.round(n[i])
    }
  }
  return {
    a: n[0],
    b: n[1]
  }
}