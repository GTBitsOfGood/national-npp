const urls = {
  baseUrl:
    process.env.VERCEL_URL != undefined
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000",
  pages: {
    home: "/",
    login: "/login",
    verify: "/verify",
    chapter: {
      projects: {
        index: "/chapter/projects",
      },
      applications: {
        index: "/chapter/applications",
      },
      profile: "/chapter/profile",
    },
    nonprofit: {
      projects: {
        index: "/nonprofit/projects",
        create: "/nonprofit/projects/create",
      },
      applications: {
        create: "/nonprofit/applications/create",
      },
      profile: "/nonprofit/profile",
    },
  },
  api: {
    projects: "/api/projects",
    chapters: "/api/chapters",
    nonprofits: "/api/nonprofits",
    users: "/api/users",
    applications: "/api/applications",
  },
};

export default urls;
