import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "ai"],
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const gameSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    product: {
      name: {
        type: String,
        required: true,
      },
      basePrice: {
        type: Number,
        required: true,
      },
    },

    aiConfig: {
      minPrice: {
        type: Number,
        required: true,
      },
      targetPrice: {
        type: Number,
        required: true,
      },
      strategy: {
        type: String,
        enum: ["aggressive", "friendly", "emotional"],
        required: true,
      },
      patience: {
        type: Number,
        required: true,
      },
    },

    currentPrice: {
      type: Number,
      required: true,
    },

    currentRound: {
      type: Number,
      default: 1,
    },

    maxRounds: {
      type: Number,
      default: 10,
    },

    messages: [messageSchema],

    status: {
      type: String,
      enum: ["ongoing", "completed", "failed"],
      default: "ongoing",
    },

    finalPrice: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const Game = mongoose.model("Game", gameSchema);

export default Game;
