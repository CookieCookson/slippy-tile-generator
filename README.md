# Slippy Tile Generator

A node.js slippy map tile generator.

Slippy takes a raster source image and creates map tiles for different zoom levels. Useful for generating custom tile layers for mapping libraries like Mapbox, Google Maps, and Leaflet.

## Installation

To use `slippy` as a command anywhere in the CLI, you can install it globally:

```
npm i -g slippy-tile-generator
```

If you wish to use it in your project as a script, you can install it into your project locally:

```
npm i slippy-tile-generator --save-dev
```

## Usage

```
slippy <source> <outputDir> --options
```

### Options

|Parameter|Description|Default|
|-|-|-|
|-min, --minZoom|The minimum zoom level.|0|
|-max, --maxZoom|The maximum zoom level.|0|
|-t, --tileSize|The output tile size.|256|
|-f, --format|The output image format. Accepts `jpg` or `png`.|jpg|
|-q, --quality|The output image quality|80|
|-h, --help|Display help for command.||

### Example

If you have the source image `./source.png` and you wish to generate tiles for zoom levels 0 through to 4 and output them into the `./tiles` directory you can run the command:

```
slippy ./source.png ./tiles -min 0 -max 4
```