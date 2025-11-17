import dayjs from "dayjs";
import { createRequire } from "module";
import { isContext } from "vm";
import Subscription from "../models/subscription.model.ts";
import { log } from "console";
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");

const Reminders = [7, 5, 2, 1];

const sendReminders = serve(async (context: any) => {
  const { subscriptionId } = context.requestPayload;
  const subscription = await fetchSubscription(context, subscriptionId);
  if (!subscription || subscription.status !== "active") return;
  const renewalDate = dayjs(subscription.renewalDate);
  if (renewalDate.isBefore(dayjs())) {
    return console.log(
      `Renewal date has passed for subscription ${subscriptionId}`
    );
  }

  for (const daysBefore of Reminders) {
    const reminderDate = renewalDate.subtract(daysBefore, "day");

    if (reminderDate.isAfter(dayjs())) {
      await sleepUntilReminder(
        context,
        `Reminder ${daysBefore} days before.`,
        reminderDate
      );
    }
    await triggerReminder(context, `Reminder ${daysBefore} days before.`);
  }
});

const fetchSubscription = async (context: any, subscriptionId: string) => {
  return await context.run("get subscription", () => {
    return Subscription.findById(subscriptionId).populate("user", "name email");
  });
};

const sleepUntilReminder = async (context: any, label: any, date: any) => {
  console.log(`Sleep until ${label} reminder at ${date}`);
  await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context: any, label: any) => {
  return context.run(label, () => {
    console.log(`Trigger ${label} reminder`);
    //Send email, SMS, Notification ...etc
  });
};

export { sendReminders };
