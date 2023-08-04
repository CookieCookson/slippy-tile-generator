/**
 * Generates the file path for a specific tile.
 * @param base The base directory
 * @param x The x position of the tile
 * @param y The y position of the tile
 * @param z The zoom level of the tile
 * @param format The image format of the tile
 * @returns The full file path
 */
const generateFilePath = (
  base: string,
  x: number,
  y: number,
  z: number,
  format: string,
): string => `${base}/${z}/${x}/${y}.${format}`;

export { generateFilePath };
