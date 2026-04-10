import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    bestPrice: {
      type: Number,
      required: true,
    },
    gameId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
      required: true,
    },
    product: {
      name: String,
      basePrice: Number,
    //   required: true,
    },
  },
  { timestamps: true },
);

leaderboardSchema.index({ basePrice: 1 });

const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);

export default Leaderboard;
