const { connect, disconnect } = require("mongoose");

const dbConnect = async () => {
  try {
    await connect(process.env.MongoDb_URL);
    console.log("Db Connected");
  } catch (error) {
    throw new Error("Cannot connect to Mongodb server");
  }
};

const dbDisconnect = async () => {
  try {
    await disconnect();
    console.log("Db Disconnected");
  } catch (error) {
    throw new Error("Cannot disconnect from Mongodb server");
  }
};

module.exports = { dbConnect, dbDisconnect };
