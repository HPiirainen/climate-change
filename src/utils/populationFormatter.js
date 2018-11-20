export function fullPopulation(population) {
  return population
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function shortPopulation(population) {
  if (population > 1000000000) {
    return (population / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (population > 1000000) {
    return (population / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (population > 1000) {
    return (population / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return population;
}
