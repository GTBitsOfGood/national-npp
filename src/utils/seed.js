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
  collection.drop();

  const nonprofit = await client
    .db("national-npp-test")
    .collection("nonprofits")
    .aggregate([{ $sample: { size: 1 } }])
    .toArray()
    .then((nonprofits) => nonprofits[0]);
  const chapters = await client
    .db("national-npp-test")
    .collection("chapters")
    .aggregate([{ $sample: { size: 1 } }])
    .toArray()
    .then((chapters) => chapters[0]);

  for (let i = 0; i < count; i++) {
    const status = faker.random.arrayElement(projectStages);
    const project = {
      nonprofit: nonprofit._id,
      name: faker.company.companyName(),
      status: status,
      type: faker.random.arrayElement(projectTypes),
      contact: new ObjectID("618a38bd87e3273af4e55579"),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    };

    // depending on the status, we might not have a chapter assigned, we might not have a maintenanceStart
    if (statusesWithChapter.indexOf(status) !== -1) {
      project["chapter"] = chapters._id;
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
    const project = await client
      .db("national-npp-test")
      .collection("projects")
      .aggregate([{ $sample: { size: 1 } }])
      .toArray()
      .then((projects) => projects[0]);

    issueData.push({
      name: faker.company.companyName(),
      project: project._id,
      address: {
        street: faker.address.streetName(),
        city: faker.address.cityName(),
        state: faker.address.state(),
        zipCode: faker.address.zipCode(),
        country: faker.address.country(),
      },
      type: faker.random.arrayElement(maintenanceTypes),
      title: faker.lorem.words(3),
      description: faker.lorem.paragraph(3),
      status: faker.random.arrayElement(issueStatuses),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    });
  }
}

async function seedApplications(client, count) {
  const collection = client.db("national-npp-test").collection("applications");
  let applicationData = [];
  collection.drop();

  for (let i = 0; i < count; i++) {
    const project = await client
      .db("national-npp-test")
      .collection("projects")
      .aggregate([{ $sample: { size: 1 } }])
      .toArray()
      .then((projects) => projects[0]);

    const application = {
      project: proj._id,
    };

    if (Math.random() >= 0.5) {
      application["aboutQ1"] = faker.lorem.paragraph(3);
    }
    if (Math.random() >= 0.5) {
      application["aboutQ2"] = faker.lorem.paragraph(3);
    }
    if (Math.random() >= 0.5) {
      application["aboutQ3"] = faker.lorem.paragraph(3);
    }
    if (Math.random() >= 0.5) {
      application["aboutQ4"] = faker.lorem.paragraph(3);
    }
    if (Math.random() >= 0.5) {
      application["needsQ1"] = faker.lorem.paragraph(3);
    }
    if (Math.random() >= 0.5) {
      application["needsQ2"] = faker.lorem.paragraph(3);
    }
    if (Math.random() >= 0.5) {
      application["needsQ3"] = faker.lorem.paragraph(3);
    }
    if (Math.random() >= 0.5) {
      application["needsQ4"] = faker.lorem.paragraph(3);
    }
    if (Math.random() >= 0.5) {
      application["needsQ5"] = faker.lorem.paragraph(3);
    }

    applicationData.push(application);
  }
}

async function seedDB() {
  const uri = process.env.DATABASE_URL;

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
  });

  try {
    await client.connect();

    console.log("Connected correctly to server");

    await seedProjects(client, 1);
    await seedChapters(client, 1);
    await seedNonprofits(client, 1);
    await seedIssues(client, 1);
    await seedApplications(client);

    console.log("Database seeded!");
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
}

seedDB();
