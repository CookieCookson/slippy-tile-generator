/**
 * Calculates how many total tiles will be generated.
 * @param minZoom The minimum zoom level
 * @param maxZoom The maximum zoom level
 * @returns 
 */
const calculateTotalTiles = (
  minZoom: number,
  maxZoom: number,
) => {
  let totalTiles = 0;
  for (let zoom = minZoom; zoom <= maxZoom; zoom += 1) {
    totalTiles += 4 ** zoom;
  }
  return totalTiles;
}

export { calculateTotalTiles };
