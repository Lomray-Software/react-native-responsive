#!/usr/bin/env node
/**
 * Fails when a module in the build toolchain still uses the removed import assertion
 * syntax (`assert { type: "json" }`). Node 20 only warns about it, Node 22 and newer
 * reject it outright, so an unpinned CI runner can break the build without any change
 * in this repository. Importing the entry point in a child process detects both cases.
 */
import { spawnSync } from 'node:child_process';

const DEPRECATION_PATTERN = /'assert' is deprecated in import statements|ERR_IMPORT_ASSERTION_TYPE_MISSING/;

/**
 * Imports the given specifier in a child process and reports what Node said about it
 */
const inspectSpecifier = (specifier, cwd) => {
  const child = spawnSync(process.execPath, ['--input-type=module', '--eval', `await import(${JSON.stringify(specifier)});`], {
    cwd,
    encoding: 'utf8',
    timeout: 30000,
    env: { ...process.env, NODE_NO_WARNINGS: '', NODE_OPTIONS: '' },
  });
  const output = `${child.stdout ?? ''}${child.stderr ?? ''}`;

  if (child.status !== 0) {
    return { ok: false, reason: `import failed with exit code ${String(child.status)}`, output };
  }

  if (DEPRECATION_PATTERN.test(output)) {
    return { ok: false, reason: 'import assertion syntax reached the module loader', output };
  }

  return { ok: true, reason: 'imported without import assertion diagnostics', output };
};

const specifier = process.argv[2] ?? 'rollup-plugin-ts';
const cwd = process.argv[3] ?? process.cwd();
const result = inspectSpecifier(specifier, cwd);

if (!result.ok) {
  console.error(`FAIL ${specifier}: ${result.reason}`);
  console.error(result.output.trim());
  process.exit(1);
}

console.log(`PASS ${specifier}: ${result.reason}`);
