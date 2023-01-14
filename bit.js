const ftp = require("basic-ftp");
const cron = require("node-cron");
const { exec } = require("child_process");

cron.schedule("0 0 * * *", function () {
  exec(
    "echo '#######' | bw export --output bit_data/ --format json",
    (error, stdout, stderr) => {
      console.log(stdout);

      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
    }
  );

  setTimeout(function () {
    ftpRun();

    async function ftpRun() {
      const client = new ftp.Client();
      client.ftp.verbose = true;
      try {
        await client.access({
          host: "######",
          port: "####",
          user: "###",
          password: "#######",
        });
        console.log(await client.list());
        await client.uploadFromDir("bit_data", "/bit/");
      } catch (err) {
        console.log(err);
      }
      client.close();
    }
  }, 5000);
});
