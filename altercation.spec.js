import { test, expect } from "vitest"
import * as altercation from "./altercation"

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
