#! /usr/bin/env node

import Jimp from "jimp";
import { Command } from "commander";
import ProgressBar from "progress";
import { calculateTotalTiles } from "./lib/calculateTotalTiles";
import { generateFilePath } from "./lib/generateFilePath";

const program = new Command();

const generateTiles = (source: string, outputDir: string) => {
  const minZoom = parseInt(program.getOptionValue("minZoom"));
  const maxZoom = parseInt(program.getOptionValue("maxZoom"));
  const tileSize = parseInt(program.getOptionValue("tileSize"));
  const format = program.getOptionValue("format");
  const quality = parseInt(program.getOptionValue("quality"));
  const totalTiles = calculateTotalTiles(minZoom, maxZoom);

  const progress = new ProgressBar(
    "generating :filename [:bar] :percent :etas",
    {
      width: 20,
      total: totalTiles,
      clear: true,
    }
  );

  Jimp.read(source, (err, baseImage) => {
    if (err) throw err;
    for (let z = minZoom; z <= maxZoom; z += 1) {
      const pow = 2 ** z;
      const size = tileSize * pow;
      const resizedBase = baseImage.clone().resize(size, size);
      for (let x = 0; x < pow; x += 1) {
        for (let y = 0; y < pow; y += 1) {
          const filename = generateFilePath(outputDir, x, y, z, format);
          resizedBase
            .clone()
            .crop(x * tileSize, y * tileSize, tileSize, tileSize)
            .quality(quality)
            .write(filename);
          progress.tick({ filename });
        }
      }
    }
    console.log(`${totalTiles} Slippy map tiles generated successfully to ${outputDir}`);
  });
};

program
  .argument("<source>", "The source image")
  .argument("<outputDir>", "The output directory")
  .option("-min, --minZoom <minZoom>", "The minimum zoom level", "0")
  .option("-max, --maxZoom <maxZoom>", "The maximum zoom level", "0")
  .option("-t, --tileSize <tileSize>", "The output tile size", "256")
  .option("-f, --format <format>", "The output image format", "jpg")
  .option("-q, --quality <quality>", "The output image quality", "80")
  .action(generateTiles)
  .parse(process.argv);
