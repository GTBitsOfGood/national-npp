const urls = {
  baseUrl:
    process.env.VERCEL_URL != undefined
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000",
  pages: {},
  api: {
    projects: "/api/projects",
    chapters: "/api/chapters",
    nonprofits: "/api/nonprofits",
    users: "/api/users",
    applications: "/api/applications",
  },
};

export default urls;
