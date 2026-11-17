/**
 * Builds a submission ZIP for the frontend exam.
 * Excludes node_modules, .next, git, reports; keeps src/assets media.
 *
 * Usage: yarn pack:submission
 */
import { spawnSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  statSync,
} from "node:fs";
import { basename, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const outDir = join(root, "dist-submission");
const stamp = new Date().toISOString().slice(0, 10);
const zipName = `frontend-home-exam-${stamp}.zip`;
const zipPath = join(outDir, zipName);
const folderName = basename(root);

const SKIP_NAMES = new Set([
  "node_modules",
  ".next",
  ".git",
  "coverage",
  "playwright-report",
  "test-results",
  "blob-report",
  "dist-submission",
  ".turbo",
  ".vercel",
  ".DS_Store",
]);

function shouldSkip(name) {
  if (SKIP_NAMES.has(name)) return true;
  if (name.endsWith(".tsbuildinfo")) return true;
  if (name.startsWith(".env")) return true;
  return false;
}

function copyTree(from, to) {
  mkdirSync(to, { recursive: true });
  for (const entry of readdirSync(from)) {
    if (shouldSkip(entry)) continue;
    const src = join(from, entry);
    const dest = join(to, entry);
    const st = statSync(src);
    if (st.isDirectory()) {
      copyTree(src, dest);
    } else {
      cpSync(src, dest);
    }
  }
}

mkdirSync(outDir, { recursive: true });
if (existsSync(zipPath)) rmSync(zipPath);

const stagingRoot = join(tmpdir(), `exam-pack-${Date.now()}`);
const stagingProject = join(stagingRoot, folderName);

try {
  copyTree(root, stagingProject);

  const ps = `
$ErrorActionPreference = 'Stop'
Compress-Archive -Path '${stagingProject.replace(/'/g, "''")}' -DestinationPath '${zipPath.replace(/'/g, "''")}' -Force
`;

  const result = spawnSync(
    "powershell.exe",
    ["-NoProfile", "-NonInteractive", "-Command", ps],
    { stdio: "inherit" },
  );

  if (result.status !== 0) {
    console.error("\nCompress-Archive failed.\n");
    process.exit(result.status ?? 1);
  }

  console.log(`\nSubmission ZIP ready:\n  ${zipPath}\n`);
} finally {
  rmSync(stagingRoot, { recursive: true, force: true });
}
