import * as ARGUED from "./argued"
import { test, expect } from "vitest"
test(`ARGUED exports`, () => {
  expect(Object.keys(ARGUED)).toEqual([
    `failIfMissingFlag`,
    `generateHelp`,
    `invalidHelpConfig`,
    `longFlag`,
    `shortFlag`,
    `NO_OP`,
    `configFile`,
    `configFileWithCancel`,
    `configurate`,
    `defaultNameTemplate`,
    `pluginToCondMap`,
    `showHelpWhen`,
    `parse`,
  ])
})
