const { exec } = require("node:child_process");

const startedAt = Date.now();
const messages = {
  waiting: "🟡 Waiting for Postgres service to start",
  ready: "🟢 Postgres service started successfully in",
};

function writeMessage(message) {
  process.stdout.clearLine(0);
  process.stdout.cursorTo(0);
  process.stdout.write(message);
}

function elapsedTime() {
  const time = (Date.now() - startedAt) / 1000;
  return time.toFixed(2) + "s";
}

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handlerReturn);
  function handlerReturn(_error, stdout, _stderr) {
    const isReady = stdout.search("accepting connections") !== -1;
    if (isReady) {
      writeMessage(`${messages.ready} ${elapsedTime()}\n`);
      return;
    }
    writeMessage(`${messages.waiting} ${elapsedTime()}`);
    checkPostgres();
  }
}

process.stdout.write("\n");
checkPostgres();
