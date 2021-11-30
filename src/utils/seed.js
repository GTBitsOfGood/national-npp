const faker = require("faker");
const MongoClient = require("mongodb").MongoClient;

async function seedProjects(client) {
  console.log(client);
}

async function seedChapters(client) {
  console.log(client);
}

async function seedNonprofits(client) {
  console.log(client);
}

async function seedIssues(client) {
  console.log(client);
}

async function seedApplications(client) {
  console.log(client);
}

async function seedDB() {
  console.log(faker); // temp
  const uri = process.env.DATABASE_URL;

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
  });

  try {
    await client.connect();

    console.log("Connected correctly to server");

    seedProjects(client);
    seedChapters(client);
    seedNonprofits(client);
    seedIssues(client);
    seedApplications(client);

    console.log("Database seeded!");

    client.close();
  } catch (err) {
    console.log(err.stack);
  }
}

seedDB();
