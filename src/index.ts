async function run(): Promise<void> {}

async function cleanup(): Promise<void> {}

if (!process.env["STATE_isPost"]) {
  run();
} else {
  cleanup();
}
