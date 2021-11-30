const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env.local") });

const faker = require("faker");
const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const ObjectID = mongo.ObjectID;

// You can't import these from types.ts because this is a js file right?
const issueStatuses = ["Pending", "In Progress", "Resolved", "Closed"];
const maintenanceTypes = ["Bug Fixes", "New Features"];
const projectTypes = ["Website", "Web app", "Mobile app"];
const projectStages = [
  "Submit Application",
  "Application Review",
  "Schedule Interview",
  "Interview Scheduled",
  "Interview Review",
  "Schedule Meeting",
  "Meeting Scheduled",
  "Maintenance",
  "Completed",
  "Cancelled",
  "Rejected",
];
const statusesWithChapter = [
  "Application Review",
  "Schedule Interview",
  "Interview Scheduled",
  "Interview Review",
  "Schedule Meeting",
  "Meeting Scheduled",
  "Maintenance",
  "Completed",
  "Cancelled",
  "Rejected",
];
const statusesWithMaintenanceStart = ["Maintenance"];

async function seedProjects(client, count) {
  const collection = client.db("national-npp-test").collection("projects");
  let projectData = [];
  // collection.drop();

  for (let i = 0; i < count; i++) {
    const status = faker.random.arrayElement(projectStages);
    const project = {
      nonprofit: new ObjectID("617ea509069ce109e2ae9f65"),
      name: faker.company.companyName(),
      status: status,
      type: faker.random.arrayElement(projectTypes),
      contact: new ObjectID("618a38bd87e3273af4e55579"),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    };

    // depending on the status, we might not have a chapter assigned, we might not have a maintenanceStart
    if (statusesWithChapter.indexOf(status) !== -1) {
      project["chapter"] = new ObjectID("61a5bf09f65bd23af098be59");
    }
    if (statusesWithMaintenanceStart.indexOf(status) !== -1) {
      project["maintenanceStart"] = faker.date.between(
        project["createdAt"],
        Date.now()
      );
    }

    projectData.push(project);
  }

  collection.insertMany(projectData);
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
      project: new ObjectID("619431b93f659442b0cca964"),
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

    seedProjects(client, 1);
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
