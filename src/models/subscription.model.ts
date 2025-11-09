import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required."],
      minLength: 2,
      maxLength: 30,
    },
    price: {
      type: Number,
      required: [true, "Subscription price is required."],
      min: 0,
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP"],
      default: "USD",
    },
    frequency: {
      type: String,
      enum: ["weekly", "monthly", "yearly"],
    },
    category: {
      type: String,
      enum: [
        "sports",
        "entertainment",
        "education",
        "productivity",
        "finance",
        "other",
      ],
      required: [true, "Subscription category is required."],
    },
    paymentMethod: {
      type: String,
      enum: ["credit card", "paypal", "bank transfer", "crypto"],
      default: "credit card",
      required: [true, "Payment method is required."],
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired", "pending"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required."],
      validate: {
        validator: (value: Date) => value <= new Date(),
        message: "Start date cannot be in the future.",
      },
    },
    renewalDate: {
      type: Date,
      required: [true, "renewal date is required."],
      validate: {
        validator: function (value: Date) {
          return value > this.startDate;
        },
        message: "renewal date must be after start date.",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

interface ISubscription extends mongoose.Document {
  startDate: Date;
  frequency: "weekly" | "monthly" | "yearly";
  renewalDate?: Date;
  status: "active" | "cancelled" | "expired" | "pending";
}

subscriptionSchema.pre<ISubscription>("save", function (next) {
  if (!this.renewalDate) {
    const renewperiods: Record<"weekly" | "monthly" | "yearly", number> = {
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    const renewalDate = new Date(this.startDate);
    renewalDate.setDate(renewalDate.getDate() + renewperiods[this.frequency]);
    this.renewalDate = renewalDate;
  }
  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }
  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
