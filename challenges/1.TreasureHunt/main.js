export default function (base, { computed }) {
  const derived = computed(() => base.reallyInterestingValue * 2)
  return {
    derived,
    secondarySomething: 'wohoo!',
  }
}