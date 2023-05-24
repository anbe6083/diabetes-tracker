export function calculateAverage(values) {
  const sum = values.reduce((total, value) => total + parseFloat(value), 0);
  return sum / values.length;
}
