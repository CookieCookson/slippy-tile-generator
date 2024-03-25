import { read } from "jimp";
import ProgressBar from "progress";
import { calculateTotalTiles } from "./calculateTotalTiles";
import { generateFilePath } from "./generateFilePath";
import generateTile from "./generateTile";

export default async ({
  source,
  outputDir,
  minZoom,
  maxZoom,
  tileSize,
  format,
  quality,
}: {
  source: string
  outputDir: string
  minZoom: number
  maxZoom: number
  tileSize: number
  format: string
  quality: number
}) => {
  const progress = new ProgressBar(
    "generating :filename [:bar] :current/:total :percent :etas",
    {
      width: 20,
      total: calculateTotalTiles(minZoom, maxZoom),
      clear: true,
    }
  );

  progress.interrupt(`reading source image ${source}`)
  const sourceImage = await read(source)
  if (sourceImage.getWidth() !== sourceImage.getHeight()) {
    progress.interrupt("Warning: Source image does not conform to a 1:1 ratio, the generated tiles will appear stretched");
  }
  const maxZoomBaseSize = (2 ** maxZoom) * tileSize
  if (maxZoomBaseSize > Math.min(sourceImage.getWidth(), sourceImage.getHeight())) {
    progress.interrupt(`Warning: Source image is smaller than largest zoom base image, output tiles will appear scaled up (source ${sourceImage.getWidth()}x${sourceImage.getHeight()} vs base ${maxZoomBaseSize}x${maxZoomBaseSize})`)
  }

  for (let z = minZoom; z <= maxZoom; z += 1) {
    const pow = 2 ** z;
    const size = tileSize * pow;
    progress.interrupt(`resizing zoom level ${z} base image`);
    const resizedBase = sourceImage.clone().resize(size, size);

    for (let x = 0; x < pow; x += 1) {
      for (let y = 0; y < pow; y += 1) {
        const filename = generateFilePath(outputDir, x, y, z, format);
        progress.tick({ filename });
        generateTile({
          baseImage: resizedBase,
          xPos: x,
          yPos: y,
          tileSize,
          quality,
        }).write(filename);
      }
    }
    progress.interrupt(`zoom level ${z} completed (${pow * pow} tiles generated)`);
  }

  progress.interrupt(`${progress.total} Slippy map tiles generated successfully to ${outputDir}`);
  progress.terminate()
};