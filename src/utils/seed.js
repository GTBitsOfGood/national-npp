const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env.local") });

const faker = require("faker");
const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const ObjectID = mongo.ObjectID;

// You can't import these from types.ts because this is a js file right?
const issueStatuses = ["Pending", "In Progress", "Resolved", "Closed"];
const maintenanceTypes = ["Bug Fixes", "New Features"];

async function seedProjects(client) {
  console.log(client);
}

async function seedChapters(client, count) {
  const collection = client.db("national-npp-test").collection("chapters");
  let chapterData = [];
  collection.drop();

  for (let i = 0; i < count; i++) {
    chapterData.push({
      name: faker.company.companyName(),
      email: faker.internet.email(),
      contact: new ObjectID("618a38bd87e3273af4e55579"),
      address: {
        street: faker.address.streetName(),
        city: faker.address.cityName(),
        state: faker.address.state(),
        zipCode: faker.address.zipCode(),
        country: faker.address.country(),
      },
      website: faker.internet.domainName(),
      facebook: faker.internet.userName(),
      instagram: faker.internet.userName(),
      maintenanceTypes: maintenanceTypes,
      maintenancePeriod: faker.datatype.number(90),
    });
  }

  collection.insertMany(chapterData);
}

async function seedNonprofits(client, count) {
  const collection = client.db("national-npp-test").collection("nonprofits");
  let nonprofitData = [];
  collection.drop();

  for (let i = 0; i < count; i++) {
    nonprofitData.push({
      name: faker.company.companyName(),
      contact: new ObjectID("618a02d484833f417ea26689"),
      address: {
        street: faker.address.streetName(),
        city: faker.address.cityName(),
        state: faker.address.state(),
        zipCode: faker.address.zipCode(),
        country: faker.address.country(),
      },
      website: faker.internet.domainName(),
      isVerified: true,
      mission: faker.lorem.paragraph(3),
    });
  }

  collection.insertMany(nonprofitData);
}

async function seedIssues(client, count) {
  const collection = client.db("national-npp-test").collection("issues");
  let issueData = [];
  collection.drop();

  for (let i = 0; i < count; i++) {
    issueData.push({
      name: faker.company.companyName(),
      project: ObjectID("619431b93f659442b0cca964"),
      address: {
        street: faker.address.streetName(),
        city: faker.address.cityName(),
        state: faker.address.state(),
        zipCode: faker.address.zipCode(),
        country: faker.address.country(),
      },
      type: maintenanceTypes[
        Math.floor(Math.random() * maintenanceTypes.length)
      ],
      title: faker.lorem.words(3),
      description: faker.lorem.paragraph(3),
      status: issueStatuses[Math.floor(Math.random() * issueStatuses.length)],
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    });
  }

  collection.insertMany(issueData);
}

async function seedApplications(client) {
  console.log(client);
}

async function seedDB() {
  const uri = process.env.DATABASE_URL;

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
  });

  try {
    await client.connect();

    console.log("Connected correctly to server");

    seedProjects(client);
    seedChapters(client, 1);
    seedNonprofits(client, 1);
    seedIssues(client, 1);
    seedApplications(client);

    console.log("Database seeded!");

    client.close();
  } catch (err) {
    console.log(err.stack);
  }
}

seedDB();
