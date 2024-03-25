import Jimp from "jimp"

interface GenerateTileParams {
  baseImage: Jimp
  xPos: number
  yPos: number
  tileSize: number
  quality: number
}

export default ({
  baseImage,
  xPos,
  yPos,
  tileSize,
  quality,
}: GenerateTileParams): Jimp => {
  return baseImage
    .clone()
    .crop(xPos * tileSize, yPos * tileSize, tileSize, tileSize)
    .quality(quality);
}
