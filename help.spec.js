import stripAnsi from "strip-ansi"

import { map } from "ramda"
import Unusual from "unusual"
import { test, expect } from "vitest"
import pkg from "./package.json"
import {
  shortFlag,
  longFlag,
  invalidHelpConfig,
  failIfMissingFlag,
  generateHelp,
} from "./help"

const u = Unusual(pkg.name + `@` + pkg.version)

test(`shortFlag`, () => {
  expect(shortFlag).toBeTruthy()
  expect(map(shortFlag)(`abcde`.split(``))).toEqual([
    `-a`,
    `-b`,
    `-c`,
    `-d`,
    `-e`,
  ])
})
test(`longFlag`, () => {
  expect(longFlag).toBeTruthy()
  expect(map(longFlag)(`abcde`.split(``))).toEqual([
    `--a`,
    `--b`,
    `--c`,
    `--d`,
    `--e`,
  ])
})
test(`invalidHelpConfig`, () => {
  expect(invalidHelpConfig).toBeTruthy()
  expect(() => invalidHelpConfig(`crapcrap`)).toThrow(
    `You must add a "crapcrap" key to the helpConfig!`,
  )
})
test(`failIfMissingFlag`, () => {
  const x = u.int(1, 1000)
  expect(failIfMissingFlag).toBeTruthy()
  const failure = failIfMissingFlag(`anything`, `crapcrap`)
  expect(failure(x)).toEqual(x)
  expect(() => failure(`???`)).toThrow(
    `You must add a "crapcrap" key to the helpConfig!`,
  )
})

test(`generateHelp - good nonsense`, () => {
  expect(generateHelp).toBeTruthy()
  const CONFIG = {
    alias: {
      grables: [`g`],
      snorbles: [`s`],
      skurpskorps: [`sk`, `k`],
    },
  }
  const HELP_CONFIG = {
    grables: `qualdal smungobal`,
    snorbles: `borflak neue neue`,
    skurpskorps: `scurr scurr`,
  }
  const GENERATED_HELP = generateHelp(
    true,
    { name: `hochopepa`, banner: `yo`, postscript: `no` },
    HELP_CONFIG,
    CONFIG,
  )
  expect(stripAnsi(GENERATED_HELP)).toEqual(`yo
 hochopepa 

  -g / --grables
  \tqualdal smungobal

  -s / --snorbles
  \tborflak neue neue

  --sk / -k / --skurpskorps
  \tscurr scurr
no`)
})

test(`generateHelp - specific nonsense`, () => {
  expect(generateHelp).toBeTruthy()
  const CONFIG = {
    alias: {
      grables: [`g`],
      snorbles: [`s`],
      skurpskorps: [`sk`, `k`],
    },
  }
  const HELP_CONFIG = {
    grables: `qualdal smungobal`,
    snorbles: `borflak neue neue`,
    skurpskorps: `scurr scurr`,
  }
  const GENERATED_HELP = generateHelp(
    true,
    {
      name: `hochopepa`,
      banner: `yo`,
      postscript: `no`,
      showName: false,
      description: `zorplesmacks`,
    },
    HELP_CONFIG,
    CONFIG,
  )
  expect(stripAnsi(GENERATED_HELP)).toEqual(`yo


zorplesmacks

  -g / --grables
  \tqualdal smungobal

  -s / --snorbles
  \tborflak neue neue

  --sk / -k / --skurpskorps
  \tscurr scurr
no`)
})

test(`generateHelp - missing parts`, () => {
  expect(generateHelp).toBeTruthy()
  const CONFIG = {
    alias: {
      grables: [`g`],
      snorbles: [`s`],
      skurpskorps: [`sk`, `k`],
    },
  }
  const HELP_CONFIG = {
    grables: `qualdal smungobal`,
    snorbles: `borflak neue neue`,
  }
  expect(() =>
    generateHelp(
      false,
      {
        banner: () => `...`,
        showName: false,
        name: `hochopepa`,
        description: `pepper de hocho`,
        postscript: `nooooo`,
      },
      HELP_CONFIG,
      CONFIG,
    ),
  ).toThrow(`You must add a "skurpskorps" key to the helpConfig!`)
})
