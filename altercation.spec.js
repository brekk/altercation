import * as altercation from "./altercation"
import { test, expect } from "vitest"

test(`altercation exports`, () => {
  expect(Object.keys(altercation)).toEqual([
    `shortFlag`,
    `longFlag`,
    `invalidHelpConfig`,
    `failIfMissingFlag`,
    `generateHelp`,
    `NO_OP`,
    `showHelpWhen`,
    `configurate`,
    `pluginToCondMap`,
    `defaultNameTemplate`,
    `configFileWithCancel`,
    `configFile`,
    `parse`,
  ])
})
