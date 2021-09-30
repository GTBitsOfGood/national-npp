import { Schema } from "mongoose";
import { MaintenancePeriod } from "src/utils/types";

const MaintenancePeriodSchema = new Schema<MaintenancePeriod>({
  duration: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
});

export default MaintenancePeriodSchema;
