#! /usr/bin/env node

import { Command } from "commander";
import generateTiles from "./lib/generateTiles";

const program = new Command();

const handleAction = (source: string, outputDir: string) => {
  const minZoom = parseInt(program.getOptionValue("minZoom"));
  const maxZoom = parseInt(program.getOptionValue("maxZoom"));
  const tileSize = parseInt(program.getOptionValue("tileSize"));
  const format = program.getOptionValue("format");
  const quality = parseInt(program.getOptionValue("quality"));

  generateTiles({
    source,
    outputDir,
    minZoom,
    maxZoom,
    tileSize,
    format,
    quality,
  })
}

program
  .argument("<source>", "The source image")
  .argument("<outputDir>", "The output directory")
  .option("-min, --minZoom <minZoom>", "The minimum zoom level", "0")
  .option("-max, --maxZoom <maxZoom>", "The maximum zoom level", "0")
  .option("-t, --tileSize <tileSize>", "The output tile size", "256")
  .option("-f, --format <format>", "The output image format", "jpg")
  .option("-q, --quality <quality>", "The output image quality", "80")
  .action(handleAction)
  .parse(process.argv);
