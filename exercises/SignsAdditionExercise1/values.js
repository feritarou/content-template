export default function ({ tags }, { randomNumber }) {
  let outTags = [...tags];
  const logProblems = [];

  if (!Array.isArray(tags)) {
    logProblems.push("'tags' must be an array");
    tags = [];
  }
  if (typeof randomNumber !== 'function') {
    logProblems.push("'randomNumber' must be a function");
    randomNumber = () => Math.random();
  }

  // Clean up categories and prioritize tags
  const tagCategories = {
    domain: ['integers', 'rationalNumbers'],
    range: ['absZeroToTen', 'absZeroToHundred', 'absZeroToThousand'],
    digits: ['oneDigit', 'twoDigit', 'threeDigit', 'manyDigit'],
    sign: ['allPositive', 'allNegative', 'mixedSigns', 'randomSigns'],
    difficulty: ['basic', 'intermediate', 'advanced', 'master']
  };

  const cleanedTags = {};
  Object.entries(tagCategories).forEach(([category, categoryTags]) => {
    const matchingTags = tags.filter(tag => categoryTags.includes(tag));
    if (matchingTags.length > 0) {
      cleanedTags[category] = matchingTags[0];
      outTags = outTags.filter(tag => tag === matchingTags[0]);
    }
  });

  // Set domain
  let domainTag = cleanedTags.domain || 'rationalNumbers';
  outTags.push(domainTag);

  // Set range
  let range = { fromInclusive: -10, toInclusive: 10 };
  if (cleanedTags.range) {
    switch (cleanedTags.range) {
      case 'absZeroToTen':
        range = { fromInclusive: -10, toInclusive: 10 };
        break;
      case 'absZeroToHundred':
        range = { fromInclusive: -100, toInclusive: 100 };
        break;
      case 'absZeroToThousand':
        range = { fromInclusive: -1000, toInclusive: 1000 };
        break;
    }
  } else if (cleanedTags.difficulty) {
    switch (cleanedTags.difficulty) {
      case 'basic':
        range = { fromInclusive: -10, toInclusive: 10 };
        break;
      case 'intermediate':
        range = { fromInclusive: -100, toInclusive: 100 };
        break;
      case 'advanced':
        range = { fromInclusive: -1000, toInclusive: 1000 };
        break;
      case 'master':
        range = { fromInclusive: -10000, toInclusive: 10000 };
        break;
    }
  } else if (domainTag === 'integers') {
    range = { fromInclusive: -1000, toInclusive: 1000 };
  }
  outTags.push(range.toInclusive <= 10 ? 'absZeroToTen' : range.toInclusive <= 100 ? 'absZeroToHundred' : range.toInclusive <= 1000 ? 'absZeroToThousand' : 'absZeroToTenThousand');

  // Set digits
  let digits;
  if (domainTag !== 'integers') {
    if (cleanedTags.digits) {
      switch (cleanedTags.digits) {
        case 'oneDigit': digits = 1; break;
        case 'twoDigit': digits = 2; break;
        case 'threeDigit': digits = 3; break;
        case 'manyDigit': digits = Math.floor(Math.random() * 3) + 3; break;
      }
    } else if (cleanedTags.difficulty) {
      switch (cleanedTags.difficulty) {
        case 'basic': digits = 1; break;
        case 'intermediate': digits = 2; break;
        case 'advanced': digits = 3; break;
        case 'master': digits = Math.floor(Math.random() * 3) + 3; break;
      }
    } else {
      digits = Math.floor(Math.random() * 3) + 1;
    }
    range.digits = digits;
    outTags.push(digits === 1 ? 'oneDigit' : digits === 2 ? 'twoDigit' : digits === 3 ? 'threeDigit' : 'manyDigit');
  }

  // Determine sign control based on difficulty, domainTag, and range
  let signControl;
  if (cleanedTags.sign) {
    signControl = cleanedTags.sign;
  } else {
    const difficulty = cleanedTags.difficulty || 'intermediate';
    const maxAbsValue = Math.max(Math.abs(range.fromInclusive), Math.abs(range.toInclusive));

    if (domainTag === 'integers') {
      switch (difficulty) {
        case 'basic':
          signControl = 'allPositive';
          break;
        case 'intermediate':
          signControl = maxAbsValue <= 10 ? 'randomSigns' : 'allPositive';
          break;
        case 'advanced':
          signControl = maxAbsValue <= 100 ? 'randomSigns' : 'mixedSigns';
          break;
        case 'master':
          signControl = 'randomSigns';
          break;
      }
    } else { // rationalNumbers
      switch (difficulty) {
        case 'basic':
          signControl = 'allPositive';
          break;
        case 'intermediate':
          signControl = digits <= 1 ? 'randomSigns' : 'allPositive';
          break;
        case 'advanced':
          signControl = digits <= 2 ? 'randomSigns' : 'mixedSigns';
          break;
        case 'master':
          signControl = 'randomSigns';
          break;
      }
    }
  }
  outTags.push(signControl);

  let domain = domainTag === 'integers' ? 'Integers' : 'RationalNumbers'

  function generateNumbers() {
    let a, b;
    do {
      a = randomNumber(domain, range);
      b = randomNumber(domain, range);

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
        default:
          // Keep the signs as they are
          break;
      }
    } while (a === 0 || b === 0); // Avoid zero values

    return { a, b };
  }

  const { a, b } = generateNumbers();
  const aPlusb = a + b;

  // Determine final difficulty based on the generated numbers
  let finalDifficulty;
  const maxAbsValue = Math.max(Math.abs(a), Math.abs(b));
  const differentSigns = Math.sign(a) !== Math.sign(b);

  if (domain === 'integers') {
    if (maxAbsValue <= 10 && !differentSigns) {
      finalDifficulty = 'basic';
    } else if (maxAbsValue <= 100 || (maxAbsValue <= 10 && differentSigns)) {
      finalDifficulty = 'intermediate';
    } else if (maxAbsValue <= 1000) {
      finalDifficulty = 'advanced';
    } else {
      finalDifficulty = 'master';
    }
  } else { // rationalNumbers
    const maxDigits = Math.max(
      (Math.abs(a) % 1).toString().length,
      (Math.abs(b) % 1).toString().length
    ) - 2; // Subtract 2 to account for "0."
    if (maxAbsValue <= 10 && maxDigits <= 1 && !differentSigns) {
      finalDifficulty = 'basic';
    } else if (maxAbsValue <= 100 && maxDigits <= 2) {
      finalDifficulty = 'intermediate';
    } else if (maxAbsValue <= 1000 && maxDigits <= 3) {
      finalDifficulty = 'advanced';
    } else {
      finalDifficulty = 'master';
    }
  }

  // Update outTags with final difficulty
  outTags = outTags.filter(tag => !tagCategories.difficulty.includes(tag));
  outTags.push(finalDifficulty);

  return {
    a,
    b,
    aPlusb,
    outTags,
    logProblems
  };
}