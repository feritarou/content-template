// Function accepting an object with 'tags' and an object with 'randomNumber' function
export default function ({ tags }, { randomNumber }) {
  // Validate inputs
  if (!Array.isArray(tags)) {
    throw new Error("'tags' must be an array");
  }
  if (typeof randomNumber !== 'function') {
    throw new Error("'randomNumber' must be a function");
  }

  // Determine the domain based on whether 'integer' is in tags
  let domain = tags.includes('integer') ? 'Integers' : 'RationalNumbers'

  // Initialize 'digits' variable
  let digits;

  // If the domain is not 'Integers', determine the number of digits based on tags
  if (domain !== 'Integers') {
    if (tags.includes('oneDigit')) {
      digits = 1;
    } else if (tags.includes('twoDigit')) {
      digits = 2;
    } else if (tags.includes('threeDigit')) {
      digits = 3;
    } else {
      // Generate a random number for digits between 1 and 10
      digits = Math.floor(Math.random() * 10) + 1;
    }
  } else if (tags.some(tag => ['oneDigit', 'twoDigit', 'threeDigit'].includes(tag))) {
    throw new Error("Digit tags cannot be used with 'integer' domain");
  }

  // Initialize 'range' variable with default values
  let range = { fromInclusive: 0, toInclusive: 10 }

  // Determine the range based on tags
  const rangeTags = ['absZeroToTen', 'absZeroToHundred'];
  const matchingRangeTags = tags.filter(tag => rangeTags.includes(tag));

  if (matchingRangeTags.length > 1) {
    throw new Error("Only one range tag can be specified");
  }

  if (matchingRangeTags.length === 1) {
    switch (matchingRangeTags[0]) {
      case 'absZeroToTen':
        range = { fromInclusive: -10, toInclusive: 10 };
        break;
      case 'absZeroToHundred':
        range = { fromInclusive: -100, toInclusive: 100 };
        break;
    }
  } else if (domain === 'Integers') {
    // If no range tag is specified and the domain is Integers, set range to -1000 to 1000
    range = { fromInclusive: -1000, toInclusive: 1000 };
  }

  // If 'digits' is defined, add it to the range
  if (digits !== undefined) {
    range.digits = digits;
  }

  // Determine sign control based on tags
  const signTags = ['allPositive', 'allNegative', 'mixedSigns', 'randomSigns'];
  const matchingSignTags = tags.filter(tag => signTags.includes(tag));

  if (matchingSignTags.length > 1) {
    throw new Error("Only one sign control tag can be specified");
  }

  let signControl = matchingSignTags[0];

  // Generate two random numbers 'a' and 'b' using the 'randomNumber' function
  let a, b;
  try {
    a = randomNumber(domain, range);
    b = randomNumber(domain, range);

    // Apply sign control
    if (signControl) {
      switch (signControl) {
        case 'allPositive':
          a = Math.abs(a);
          b = Math.abs(b);
          break;
        case 'allNegative':
          a = -Math.abs(a);
          b = -Math.abs(b);
          break;
        case 'mixedSigns':
          if (Math.random() < 0.5) {
            a = -Math.abs(a);
            b = Math.abs(b);
          } else {
            a = Math.abs(a);
            b = -Math.abs(b);
          }
          break;
        case 'randomSigns':
        // Intentionally fall through to default case
        default:
          a = Math.random() < 0.5 ? a : -a;
          b = Math.random() < 0.5 ? b : -b;
      }
    } else {
      // No sign control tag specified, use random signs
      a = Math.random() < 0.5 ? a : -a;
      b = Math.random() < 0.5 ? b : -b;
    }
  } catch (error) {
    throw new Error(`Error generating random numbers: ${error.message}`);
  }

  // Compute their sum
  const aPlusb = a + b;

  // Return the generated numbers and their sum
  return {
    a,
    b,
    aPlusb
  }
}