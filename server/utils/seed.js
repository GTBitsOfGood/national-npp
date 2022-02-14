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
const statusesWithReviewer = issueStatuses.filter(
  (status) => status != "Pending"
);

const TEST_DATABASE = "national-npp-test";
const TEST_CONTACT = new ObjectID("617ea1ef4fc7ad703f5db086"); // An existing user in the database
const NUM_CHAPTERS_TO_CREATE = 5;
const NUM_NONPROFITS_TO_CREATE = 5;
const NUM_PROJECTS_TO_CREATE = 5;
const NUM_ISSUES_TO_CREATE = 5;
const NUM_APPLICATIONS_TO_CREATE = 5;

/* End Configuration */

class DBSeeder {
  constructor(db, userId, userType) {
    this.db = db;
    this.userId = new ObjectID(userId);
    this.userType = userType;
  }

  async userExists() {
    const userCount = await this.db
      .collection("users")
      .find({ _id: this.userId })
      .count();

    return userCount != 0;
  }

  async getRandomChapter() {
    const chapters = await this.db
      .collection("chapters")
      .aggregate([{ $sample: { size: 1 } }])
      .toArray();

    return chapters[0];
  }

  async getRandomNonprofit() {
    const nonprofits = await this.db
      .collection("nonprofits")
      .aggregate([{ $sample: { size: 1 } }])
      .toArray();

    return nonprofits[0];
  }

  async getRandomProject(orgFilter) {
    const projects = await this.db
      .collection("projects")
      .aggregate([{ $match: orgFilter }, { $sample: { size: 1 } }])
      .toArray();

    return projects[0];
  }

  async createChapters() {
    const testChapters = [];

    for (let i = 0; i < NUM_CHAPTERS_TO_CREATE; i++) {
      testChapters.push({
        name: faker.company.companyName(),
        email: faker.internet.email(),
        contact: TEST_CONTACT,
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

    await this.db.collection("chapters").insertMany(testChapters);
  }

  async createNonprofits() {
    const testNonprofits = [];

    for (let i = 0; i < NUM_NONPROFITS_TO_CREATE; i++) {
      testNonprofits.push({
        name: faker.company.companyName(),
        contact: TEST_CONTACT,
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

    await this.db.collection("nonprofits").insertMany(testNonprofits);
  }

  async assignUsertoOrg() {
    await this.db.collection("users").updateOne(
      { _id: this.userId },
      {
        $unset: {
          nonprofit: "",
          chapter: "",
        },
      }
    );

    const orgFilter = {};
    if (this.userType == "nonprofit") {
      const nonprofit = await this.getRandomNonprofit();

      orgFilter.nonprofit = nonprofit._id;
      orgFilter.roles = ["Nonprofit Member", "Nonprofit Admin"];
    } else if (this.userType == "chapter") {
      const chapter = await this.getRandomChapter();

      orgFilter.chapter = chapter._id;
      orgFilter.roles = ["Chapter Member", "Chapter Admin"];
    }

    await this.db
      .collection("users")
      .updateOne({ _id: this.userId }, { $set: orgFilter });
  }

  async createProjects() {
    const testProjects = [];

    const user = await this.db
      .collection("users")
      .findOne({ _id: this.userId });

    for (let i = 0; i < NUM_PROJECTS_TO_CREATE; i++) {
      const status = faker.random.arrayElement(projectStages);
      const hasChapter = stagesWithChapter.includes(status);

      const project = {
        name: faker.company.companyName(),
        status: status,
        type: faker.random.arrayElement(projectTypes),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      };

      if (this.userType == "nonprofit") {
        project.nonprofit = user.nonprofit;

        if (hasChapter) {
          const chapter = await this.getRandomChapter();
          project.chapter = chapter._id;
        }
      } else if (this.userType == "chapter") {
        const nonprofit = await this.getRandomNonprofit();
        project.nonprofit = nonprofit._id;

        if (hasChapter) {
          project.chapter = user.chapter;
        }
      }

      if (hasChapter) {
        project.contact = TEST_CONTACT;
      }

      if (status == "Maintenance") {
        project.maintenanceStart = faker.date.between(
          project.createdAt,
          new Date(Date.now())
        );
      }

      testProjects.push(project);
    }

    await this.db.collection("projects").insertMany(testProjects);
  }

  async createIssues() {
    const testIssues = [];

    const user = await this.db
      .collection("users")
      .findOne({ _id: this.userId });

    const orgFilter = {};
    if (this.userType == "nonprofit") {
      orgFilter.nonprofit = new ObjectID(user.nonprofit);
    } else if (this.userType == "chapter") {
      orgFilter.chapter = new ObjectID(user.chapter);
    }

    for (let i = 0; i < NUM_ISSUES_TO_CREATE; i++) {
      const project = await this.getRandomProject(orgFilter);
      const status = faker.random.arrayElement(issueStatuses);

      const issue = {
        name: faker.company.companyName(),
        project: project._id,
        type: faker.random.arrayElement(maintenanceTypes),
        title: faker.lorem.words(3),
        description: faker.lorem.paragraph(3),
        status: status,
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      };

      if (statusesWithReviewer.includes(status)) {
        issue.reviewer = TEST_CONTACT;
      }

      testIssues.push(issue);
    }

    await this.db.collection("issues").insertMany(testIssues);
  }

  async createApplications() {
    const testApplications = [];

    const user = await this.db
      .collection("users")
      .findOne({ _id: this.userId });

    const orgFilter = {
      status: { $ne: "Submit Application" },
    };

    if (this.userType == "nonprofit") {
      orgFilter.nonprofit = new ObjectID(user.nonprofit);
    } else if (this.userType == "chapter") {
      orgFilter.chapter = new ObjectID(user.chapter);
    }

    for (let i = 0; i < NUM_APPLICATIONS_TO_CREATE; i++) {
      const project = await this.getRandomProject(orgFilter);

      const application = {
        project: project._id,
      };

      const questions = [
        "aboutQ1",
        "aboutQ2",
        "aboutQ3",
        "aboutQ4",
        "needsQ1",
        "needsQ2",
        "needsQ3",
        "needsQ4",
        "needsQ5",
      ];

      questions.forEach((question) => {
        if (Math.round(Math.random()) == 0) {
          application[question] = faker.lorem.paragraph(3);
        }
      });

      testApplications.push(application);
    }

    await this.db.collection("applications").insertMany(testApplications);
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

  const seeder = new DBSeeder(client.db(TEST_DATABASE), userId, userType);
  if (!seeder.userExists()) {
    throw new Error("User does not exist");
  }

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
