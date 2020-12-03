import { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";
import Airtable from "airtable";
import { Feedback } from "types";
import { isEmailBurner } from "burner-email-providers";

type Response =
  | { status: "success" }
  | { status: "failure"; error: string; code: string };

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE);

const schema = yup.object().shape({
  message: yup.string().required(),
  email: yup .string() .email("Invalid email address."),
  twitter: yup.string(),
});

export default async function submitFeedbackListener(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method.toUpperCase() !== "POST") {
    return res.status(405).json({
      status: "failure",
      error: "Unsupported method.",
      code: "method",
    });
  }

  try {
    var { message, email, twitter } = await schema.validate(req.body);
  } catch (error) {
    const err = error as yup.ValidationError;
    res
      .status(400)
      .json({ status: "failure", error: err.message, code: "yup" });
  }

  if (email && isEmailBurner(email)) {
    return res.status(400).json({
      status: "failure",
      error: "The email is disposable",
      code: "disposable",
    });
  }

  const table = base("feedback") as Airtable.Table<Feedback>;

  try {
    await table.create({ message, email, twitter });
    return res.json({ status: "success" });
  } catch (error) {
    return res.status(400).json({
      status: "failure",
      error: error.message,
      code: "airtable",
    });
  }
}
