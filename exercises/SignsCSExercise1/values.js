// This module generates coordinates based on various criteria and tools

// Function to determine the offered tool and its properties
function offeredTool(tags) {
  const toolControlTags = [
    "positiveXTool",
    "positiveYTool",
    "negativeXTool",
    "negativeYTool",
    "nonNegativeXTool",
    "nonNegativeYTool",
    "nonPositiveXTool",
    "nonPositiveYTool",
    "originTool",
  ];

  const toolMapping = {
    positiveXTool: {
      flagColor: "#F2F2F2",
      flagDescription: "point with positive x coordinate",
    },
    positiveYTool: {
      flagColor: "#EB5757",
      flagDescription: "point with positive y coordinate",
    },
    negativeXTool: {
      flagColor: "#F2994A",
      flagDescription: "point with negative x coordinate",
    },
    negativeYTool: {
      flagColor: "#F2C94C",
      flagDescription: "point with negative y coordinate",
    },
    nonNegativeXTool: {
      flagColor: "#219653",
      flagDescription: "point with non-negative x coordinate",
    },
    nonNegativeYTool: {
      flagColor: "#27AE60",
      flagDescription: "point with non-negative y coordinate",
    },
    nonPositiveXTool: {
      flagColor: "#6FCF97",
      flagDescription: "point with non-positive x coordinate",
    },
    nonPositiveYTool: {
      flagColor: "#2F80ED",
      flagDescription: "point with non-positive y coordinate",
    },
    originTool: {
      flagColor: "#2D9CDB",
      flagDescription: "the origin",
    },
  };

  const includedTools = toolControlTags.filter((tag) => tags.includes(tag));

  let selectedTool;
  if (includedTools.length === 0) {
    selectedTool =
      toolControlTags[Math.floor(Math.random() * toolControlTags.length)];
  } else {
    selectedTool = includedTools[0];
  }

  const { flagColor, flagDescription } = toolMapping[selectedTool];

  return { flagColor, flagDescription, selectedTool };
}


// Function to check if a point satisfies the conditions of the selected tool
function isPointSolution([x, y], selectedTool) {
  switch (selectedTool) {
    case "positiveXTool":
      return x > 0;
    case "positiveYTool":
      return y > 0;
    case "negativeXTool":
      return x < 0;
    case "negativeYTool":
      return y < 0;
    case "nonNegativeXTool":
      return x >= 0;
    case "nonNegativeYTool":
      return y >= 0;
    case "nonPositiveXTool":
      return x <= 0;
    case "nonPositiveYTool":
      return y <= 0;
    case "originTool":
      return x === 0 && y === 0;
    default:
      return false;
  }
}

// Function to generate a single coordinate
function generateCoordinate(maxAbsValue, isIntegerDomain, digitsOption) {
  let value;

  if (isIntegerDomain) {
    value =
      Math.floor(Math.random() * (2 * maxAbsValue + 1)) - maxAbsValue;
  } else {
    let numDigits;
    if (digitsOption === "oneDigit") {
      numDigits = 1;
    } else if (digitsOption === "twoDigit") {
      numDigits = 2;
    } else {
      numDigits = Math.floor(Math.random() * 3);
    }

    const sign = Math.random() < 0.5 ? -1 : 1;
    const integerPart = Math.random() * maxAbsValue;
    const factor = Math.pow(10, numDigits);
    const fractionalPart = Math.floor(Math.random() * factor) / factor;

    value = sign * (integerPart + fractionalPart);
    value = parseFloat(value.toFixed(numDigits));
  }

  value = Math.max(-maxAbsValue, Math.min(maxAbsValue, value));

  if (isIntegerDomain) {
    value = Math.round(value);
  }

  return value;
}


// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// Function to generate points based on the selected criteria
function generatePoints(numberOfSolutionsTag, selectedTool, maxAbsValue, isIntegerDomain, digitsOption) {
  let points = [];
  let solutions = [];

  const generatePoint = () => [
    generateCoordinate(maxAbsValue, isIntegerDomain, digitsOption),
    generateCoordinate(maxAbsValue, isIntegerDomain, digitsOption)
  ];

  const addPoint = (point) => {
    if (points.length < 5) {
      points.push(point);
      if (isPointSolution(point, selectedTool)) {
        solutions.push(point);
      }
    }
  };

  while (points.length < 5) {
    const point = generatePoint();

    switch (numberOfSolutionsTag) {
      case "noSolution":
        if (!isPointSolution(point, selectedTool)) {
          addPoint(point);
        }
        break;
      case "oneSolution":
        if (solutions.length === 0 || !isPointSolution(point, selectedTool)) {
          addPoint(point);
        } else if (solutions.length === 1 && !isPointSolution(point, selectedTool)) {
          addPoint(point);
        }
        break;
      case "someSolution":
        if (solutions.length < 3 && isPointSolution(point, selectedTool) || !isPointSolution(point, selectedTool)) {
          addPoint(point);
        }
        break;
      case "eachIsSolution":
        if (isPointSolution(point, selectedTool)) {
          addPoint(point);
        }
        break;
    }
  }

  if (numberOfSolutionsTag !== "eachIsSolution" && numberOfSolutionsTag !== "noSolution") {
    points = shuffleArray(points);
  }

  return { points, solutions };
}

// Main function to generate coordinates
export default function ({ tags }) {
  const { flagColor, flagDescription, selectedTool } = offeredTool(tags);

  const numberOfSolutionsControlTags = ["noSolution", "oneSolution", "someSolution", "eachIsSolution"];
  const includedNumberOfSolutionsTags = numberOfSolutionsControlTags.filter((tag) => tags.includes(tag));
  const numberOfSolutionsTag = includedNumberOfSolutionsTags.length === 0 ? "someSolution" : includedNumberOfSolutionsTags[0];

  const isIntegerDomain = tags.includes("integer");

  const rangeTags = ["absZeroToTen", "absZeroToHundred"];
  const includedRangeTags = rangeTags.filter((tag) => tags.includes(tag));
  const rangeTag = includedRangeTags.length === 1 ? includedRangeTags[0] : "absZeroToTen";
  const maxAbsValue = rangeTag === "absZeroToTen" ? 10 : 100;

  const digitsTags = ["oneDigit", "twoDigit"];
  const includedDigitsTags = digitsTags.filter((tag) => tags.includes(tag));
  const digitsOption = includedDigitsTags.length === 1 ? includedDigitsTags[0] : null;

  const { points, solutions } = generatePoints(numberOfSolutionsTag, selectedTool, maxAbsValue, isIntegerDomain, digitsOption);

  // Destructure the points for the return object
  const [[ax, ay], [bx, by], [cx, cy], [dx, dy], [ex, ey]] = points;

  return {
    ax, ay, bx, by, cx, cy, dx, dy, ex, ey,
    flagColor,
    flagDescription,
    solutions,
  };
}