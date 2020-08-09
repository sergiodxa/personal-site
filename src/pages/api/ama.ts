import { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GH_TOKEN,
});

type Response = { status: "success" } | { status: "failure"; error: string };

export default async function listener(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method.toUpperCase() !== "POST") {
    return res
      .status(405)
      .json({ status: "failure", error: "Unsupported method." });
  }

  const { question } = req.body as { question: string };
  const title = question.length > 75 ? question.slice(0, 75) + "..." : question;

  try {
    await octokit.request("POST /repos/{owner}/{repo}/issues", {
      owner: "sergiodxa",
      repo: "ama",
      title,
      body: question,
      assignees: ["sergiodxa"]
    });
    return res.json({ status: "success" });
  } catch (error) {
    return res.json({ status: "failure", error: error.message });
  }
}
