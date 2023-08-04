import { generateFilePath } from "./generateFilePath";

it ("generates the correct file path", () => {
  expect(generateFilePath("base/path", 1, 2, 3, "png")).toEqual("base/path/3/1/2.png");
});
