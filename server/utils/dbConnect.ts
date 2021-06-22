import mongoose from "mongoose";

async function dbConnect(): Promise<void> {
  if (mongoose.connections[0].readyState) return;

  await mongoose
    .connect(process.env.DATABASE_URL as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .catch((error) => {
      console.error("Unable to connect to database.");

      throw error;
    });
}

export default dbConnect;
