#!/usr/bin/env node
/**
 * Verifies the build tooling checker on two controls: a module that uses the removed
 * import assertion syntax must fail, and a plain module must pass.
 */
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const checker = path.join(path.dirname(fileURLToPath(import.meta.url)), 'check-build-tooling.mjs');
const root = mkdtempSync(path.join(tmpdir(), 'build-tooling-test-'));

/**
 * Writes a package with the given entry body and returns its directory
 */
const createFixture = (name, entryBody) => {
  const dir = path.join(root, 'node_modules', name);

  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, 'package.json'), JSON.stringify({ name, version: '1.0.0', type: 'module', main: 'index.js' }));
  writeFileSync(path.join(dir, 'data.json'), JSON.stringify({ value: 1 }));
  writeFileSync(path.join(dir, 'index.js'), entryBody);

  return dir;
};

writeFileSync(path.join(root, 'package.json'), JSON.stringify({ name: 'fixture-root', version: '1.0.0', type: 'module' }));
createFixture('fixture-legacy-assertion', 'import data from "./data.json" assert { type: "json" };\nexport default data;\n');
createFixture('fixture-plain', 'export default { value: 1 };\n');

/**
 * Runs the checker against one fixture specifier
 */
const runChecker = (specifier) => spawnSync(process.execPath, [checker, specifier, root], { encoding: 'utf8' });

const failing = runChecker('fixture-legacy-assertion');
const passing = runChecker('fixture-plain');
const failures = [];

rmSync(root, { recursive: true, force: true });

if (failing.status !== 1 || !/import assertion syntax|Unexpected identifier ['"]assert['"]/.test(failing.stderr)) {
  failures.push(`expected a failing exit and an import assertion diagnostic for the assertion fixture, got ${String(failing.status)}: ${failing.stdout}${failing.stderr}`);
}

if (passing.status !== 0) {
  failures.push(`expected a zero exit for the plain fixture, got ${String(passing.status)}: ${passing.stdout}${passing.stderr}`);
}

if (failures.length > 0) {
  console.error(`FAIL check-build-tooling self-test:\n${failures.join('\n')}`);
  process.exit(1);
}

console.log('PASS check-build-tooling self-test: assertion fixture fails, plain fixture passes');
