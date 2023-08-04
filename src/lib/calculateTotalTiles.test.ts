import { calculateTotalTiles } from "./calculateTotalTiles";

[
  [0, 0, 1],
  [0, 1, 5],
  [0, 2, 21],
  [1, 1, 4],
  [1, 2, 20],
  [0, 6, 5461],
].forEach((zoomArray) => {
  const [minZoom, maxZoom, expected] = zoomArray;
  test(`it calculates the total amount of tiles from zoom level ${minZoom} to ${maxZoom}`, () => {
    expect(calculateTotalTiles(minZoom, maxZoom)).toEqual(expected);
  });
});
