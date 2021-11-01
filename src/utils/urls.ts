function getBaseURL() {
  // if backend
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  // if client-side
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  return "http://localhost:3000";
}
const urls = {
  baseUrl: getBaseURL(),
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
    uploads: "/api/uploads",
    applications: "/api/applications",
  },
};

export default urls;
