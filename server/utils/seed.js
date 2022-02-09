const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env.local") });

const faker = require("faker");
const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const ObjectID = mongo.ObjectID;

/* Configuration */

const userTypes = ["nonprofit", "chapter"];
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
const stagesWithChapter = projectStages.filter(
  (stage) => !["Submit Application", "Application Review"].includes(stage)
);

const TEST_DATABASE = "national-npp-test";
const NUM_CHAPTERS_TO_CREATE = 5;
const NUM_NONPROFITS_TO_CREATE = 5;
const NUM_PROJECTS_TO_CREATE = 5;
const NUM_ISSUES_TO_CREATE = 5;
const NUM_APPLICATIONS_TO_CREATE = 5;

/* End Configuration */

class DBSeeder {
  constructor(client, userId, userType) {
    this.client = client;
    this.userId = new ObjectID(userId);
    this.userType = userType;
  }

  async createChapters() {
    const chapterCollection = this.client
      .db(TEST_DATABASE)
      .collection("chapters");
    const testChapters = [];

    for (let i = 0; i < NUM_CHAPTERS_TO_CREATE; i++) {
      testChapters.push({
        name: faker.company.companyName(),
        email: faker.internet.email(),
        contact: new ObjectID("617ea1ef4fc7ad703f5db086"),
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
        maintenanceTypes: faker.random.arrayElements(
          maintenanceTypes,
          1 + Math.floor(Math.random() * maintenanceTypes.length)
        ),
        maintenancePeriod: faker.datatype.number(90),
      });
    }

    await chapterCollection.insertMany(testChapters);
  }

  async createNonprofits() {
    const nonprofitCollection = this.client
      .db(TEST_DATABASE)
      .collection("nonprofits");
    const testNonprofits = [];

    for (let i = 0; i < NUM_NONPROFITS_TO_CREATE; i++) {
      testNonprofits.push({
        name: faker.company.companyName(),
        contact: new ObjectID("617ea1ef4fc7ad703f5db086"),
        address: {
          street: faker.address.streetName(),
          city: faker.address.cityName(),
          state: faker.address.state(),
          zipCode: faker.address.zipCode(),
          country: faker.address.country(),
        },
        website: faker.internet.domainName(),
        isVerified: Math.round(Math.random()) == 0 ? false : true,
        mission: faker.lorem.paragraph(3),
      });
    }

    await nonprofitCollection.insertMany(testNonprofits);
  }

  async assignUsertoOrg() {
    const userCollection = this.client.db(TEST_DATABASE).collection("users");
    const nonprofitCollection = this.client
      .db(TEST_DATABASE)
      .collection("nonprofits");
    const chapterCollection = this.client
      .db(TEST_DATABASE)
      .collection("chapters");

    const userCount = await userCollection.find({ _id: this.userId }).count();
    if (userCount == 0) {
      throw new Error("User does not exist");
    }

    await userCollection.updateOne(
      { _id: this.userId },
      {
        $unset: {
          nonprofit: "",
          chapter: "",
        },
      }
    );

    const orgQueryBody = {};

    if (this.userType == "nonprofit") {
      const nonprofit = await nonprofitCollection
        .aggregate([{ $sample: { size: 1 } }])
        .toArray()
        .then((nonprofits) => nonprofits[0]);

      orgQueryBody.nonprofit = nonprofit._id;
      orgQueryBody.roles = ["Nonprofit Member", "Nonprofit Admin"];
    } else if (this.userType == "chapter") {
      const chapter = await chapterCollection
        .aggregate([{ $sample: { size: 1 } }])
        .toArray()
        .then((chapters) => chapters[0]);

      orgQueryBody.chapter = chapter._id;
      orgQueryBody.roles = ["Chapter Member", "Chapter Admin"];
    }

    await userCollection.updateOne(
      { _id: this.userId },
      { $set: orgQueryBody }
    );
  }

  async createProjects() {
    const userCollection = this.client.db(TEST_DATABASE).collection("users");
    const nonprofitCollection = this.client
      .db(TEST_DATABASE)
      .collection("nonprofits");
    const chapterCollection = this.client
      .db(TEST_DATABASE)
      .collection("chapters");
    const projectCollection = this.client
      .db(TEST_DATABASE)
      .collection("projects");
    const testProjects = [];

    const user = await userCollection.findOne({ _id: this.userId });

    for (let i = 0; i < NUM_PROJECTS_TO_CREATE; i++) {
      const status = faker.random.arrayElement(projectStages);
      const project = {
        name: faker.company.companyName(),
        status: status,
        type: faker.random.arrayElement(projectTypes),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      };

      if (this.userType == "nonprofit") {
        project.nonprofit = user.nonprofit;

        if (stagesWithChapter.includes(status)) {
          const chapter = await chapterCollection
            .aggregate([{ $sample: { size: 1 } }])
            .toArray()
            .then((chapters) => chapters[0]);

          project.chapter = chapter._id;
        }
      } else if (this.userType == "chapter") {
        const nonprofit = await nonprofitCollection
          .aggregate([{ $sample: { size: 1 } }])
          .toArray()
          .then((nonprofits) => nonprofits[0]);

        project.nonprofit = nonprofit._id;
        if (stagesWithChapter.includes(status)) {
          project.chapter = user.chapter;
        }
      }

      if (stagesWithChapter.includes(status)) {
        project.contact = new ObjectID("617ea1ef4fc7ad703f5db086");
      }

      if (status == "Maintenance") {
        project.maintenanceStart = faker.date.between(
          project.createdAt,
          new Date(Date.now())
        );
      }

      testProjects.push(project);
    }

    await projectCollection.insertMany(testProjects);
  }

  async createIssues() {
    const issueCollection = this.client.db(TEST_DATABASE).collection("issues");
    const projectCollection = this.client
      .db(TEST_DATABASE)
      .collection("projects");
    const userCollection = this.client.db(TEST_DATABASE).collection("users");
    const testIssues = [];

    const user = await userCollection.findOne({ _id: this.userId });
    const orgQueryBody = {};
    if (this.userType == "nonprofit") {
      orgQueryBody.nonprofit = new ObjectID(user.nonprofit);
    } else if (this.userType == "chapter") {
      orgQueryBody.chapter = new ObjectID(user.chapter);
    }

    for (let i = 0; i < NUM_ISSUES_TO_CREATE; i++) {
      const project = await projectCollection
        .aggregate([{ $match: orgQueryBody }, { $sample: { size: 1 } }])
        .toArray()
        .then((projects) => projects[0]);

      testIssues.push({
        name: faker.company.companyName(),
        project: project._id,
        type: faker.random.arrayElement(maintenanceTypes),
        title: faker.lorem.words(3),
        description: faker.lorem.paragraph(3),
        status: faker.random.arrayElement(issueStatuses),
        reviewer: new ObjectID("617ea1ef4fc7ad703f5db086"),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      });
    }

    await issueCollection.insertMany(testIssues);
  }

  async createApplications() {
    const projectCollection = this.client
      .db(TEST_DATABASE)
      .collection("projects");
    const appCollection = this.client
      .db(TEST_DATABASE)
      .collection("applications");
    const userCollection = this.client.db(TEST_DATABASE).collection("users");
    const testApplications = [];

    const user = await userCollection.findOne({ _id: this.userId });
    const orgQueryBody = {
      status: { $ne: "Submit Application" },
    };

    if (this.userType == "nonprofit") {
      orgQueryBody.nonprofit = new ObjectID(user.nonprofit);
    } else if (this.userType == "chapter") {
      orgQueryBody.chapter = new ObjectID(user.chapter);
    }

    for (let i = 0; i < NUM_APPLICATIONS_TO_CREATE; i++) {
      const project = await projectCollection
        .aggregate([{ $match: orgQueryBody }, { $sample: { size: 1 } }])
        .toArray()
        .then((projects) => projects[0]);

      const application = {
        project: project._id,
      };

      if (Math.random() >= 0.5) {
        application.aboutQ1 = faker.lorem.paragraph(3);
      }

      if (Math.random() >= 0.5) {
        application.aboutQ2 = faker.lorem.paragraph(3);
      }

      if (Math.random() >= 0.5) {
        application.aboutQ3 = faker.lorem.paragraph(3);
      }

      if (Math.random() >= 0.5) {
        application.aboutQ4 = faker.lorem.paragraph(3);
      }

      if (Math.random() >= 0.5) {
        application.needsQ1 = faker.lorem.paragraph(3);
      }

      if (Math.random() >= 0.5) {
        application.needsQ2 = faker.lorem.paragraph(3);
      }

      if (Math.random() >= 0.5) {
        application.needsQ3 = faker.lorem.paragraph(3);
      }

      if (Math.random() >= 0.5) {
        application.needsQ4 = faker.lorem.paragraph(3);
      }

      if (Math.random() >= 0.5) {
        application.needsQ5 = faker.lorem.paragraph(3);
      }

      testApplications.push(application);
    }

    await appCollection.insertMany(testApplications);
  }
}

async function seedDB() {
  console.log("Seeding database...");

  if (process.argv.length != 4) {
    throw new Error("Incorrect number of arguments provided");
  }

  const [userId, userType] = process.argv.slice(2);

  if (!ObjectID.isValid(userId)) {
    throw new Error("User ID is invalid");
  }

  if (!userTypes.includes(userType)) {
    throw new Error("User type is invalid");
  }

  const client = new MongoClient(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  });

  await client.connect();

  const seeder = new DBSeeder(client, userId, userType);
  await seeder.createChapters();
  await seeder.createNonprofits();
  await seeder.assignUsertoOrg();
  await seeder.createProjects();
  await seeder.createIssues();
  await seeder.createApplications();
  await client.close();
}

seedDB()
  .then(() => console.log("Database seeded!"))
  .catch((error) => console.log(error));
