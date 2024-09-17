export default function () {
  const R = 10;   // Outer radius of the star
  const r = 5;    // Inner radius of the star
  const yc = 0;   // Center y-coordinate
  const xc = 0;   // Center x-coordinate (on y-axis for symmetry)
  const theta0 = -Math.PI / 2; // Start angle to align the top vertex on the y-axis

  // Generate scaling factor n between 0.5 and 3
  const n = 0.5 + Math.random() * 2.5;

  // Arrays to hold the coordinates of the vertices
  const x_coords = [];
  const y_coords = [];
  const letters = 'ABCDEFGHIJ';

  // Calculate the coordinates of each vertex centered at x=0
  for (let i = 0; i < 10; i++) {
    const theta = theta0 + i * (Math.PI / 5); // Increment angle by 36 degrees
    const radius = (i % 2 === 0) ? R : r;     // Alternate between outer and inner radius
    const x = xc + n * radius * Math.cos(theta);
    const y = yc + n * radius * Math.sin(theta);
    x_coords.push(x);
    y_coords.push(-y); // Invert y-coordinate
  }

  const variables = {};

  // Map coordinates to variables with letters
  for (let i = 0; i < 10; i++) {
    const letter = letters[i];
    variables[`vertice${letter}x`] = x_coords[i];
    variables[`vertice${letter}y`] = y_coords[i];
  }

  // xMax - the capital letter related to the vertex with the highest x coordinate
  let maxX = -Infinity;
  let maxXIndex = -1;
  for (let i = 0; i < x_coords.length; i++) {
    if (x_coords[i] > maxX) {
      maxX = x_coords[i];
      maxXIndex = i;
    }
  }
  variables['xMax'] = letters[maxXIndex];

  // yMin - the comma-separated capital letters related to the vertices with minimal y coordinate
  let minY = Infinity;
  for (let i = 0; i < y_coords.length; i++) {
    if (y_coords[i] < minY) {
      minY = y_coords[i];
    }
  }
  // Collect all letters with y coordinate equal to minY
  const minYLetters = [];
  for (let i = 0; i < y_coords.length; i++) {
    if (Math.abs(y_coords[i] - minY) < 1e-10) {
      minYLetters.push(letters[i]);
    }
  }
  variables['yMin'] = minYLetters.join(',');

  // NotIntegerX - the capital letter of the vertex with x coordinate closest to .5 between two integers
  let minDistanceToHalf = Infinity;
  let notIntegerXIndex = -1;
  for (let i = 0; i < x_coords.length; i++) {
    const x = x_coords[i];
    const fractionalPart = x - Math.floor(x);
    const distanceToHalf = Math.abs(fractionalPart - 0.5);
    if (distanceToHalf < minDistanceToHalf) {
      minDistanceToHalf = distanceToHalf;
      notIntegerXIndex = i;
    }
  }
  variables['NotIntegerX'] = letters[notIntegerXIndex];

  // NotIntegerXCeilx - the neighboring integer x-value to the right from that vertex
  variables['NotIntegerXCeilx'] = Math.ceil(x_coords[notIntegerXIndex]);

  // zeroX - the comma-separated capital letters of the vertices that have zero x coordinates
  const zeroXLetters = [];
  for (let i = 0; i < x_coords.length; i++) {
    if (Math.abs(x_coords[i]) < 1e-10) {
      zeroXLetters.push(letters[i]);
    }
  }
  variables['zeroX'] = zeroXLetters.join(',');

  return variables;
}
