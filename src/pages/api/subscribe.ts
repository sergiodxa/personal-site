import { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";
import Airtable from "airtable";
import { CourseSubscription } from "types";
import { isEmailBurner } from "burner-email-providers";

type Response =
  | { status: "success" }
  | { status: "failure"; error: string; code: string };

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_COURSE_BASE);

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address.")
    .required("Email is required!"),
  course: yup.string().oneOf(["swr", "react-query"]).required(),
});

export default async function subscribeToCourseListener(
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
    var { email, course } = await schema.validate(req.body);
  } catch (error) {
    const err = error as yup.ValidationError;
    res
      .status(400)
      .json({ status: "failure", error: err.message, code: "yup" });
  }

  if (isEmailBurner(email)) {
    console.log(email);
    return res.status(400).json({
      status: "failure",
      error: "The email is disposable",
      code: "disposable",
    });
  }

  const table = base(course) as Airtable.Table<CourseSubscription>;

  try {
    await table.create({ email, status: "subscribed" });
    return res.json({ status: "success" });
  } catch (error) {
    return res.status(400).json({
      status: "failure",
      error: error.message,
      code: "airtable",
    });
  }
}
