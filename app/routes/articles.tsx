import { Octokit } from "@octokit/rest";
import { ActionFunction, json, redirect } from "@remix-run/node";
import { LoaderFunction, useRouteData } from "@remix-run/react";
import { collectedNotes } from "collected-notes";
import { NavLink } from "react-router-dom";
import { AMAForm } from "../components/ama-form";
import { ArticleItem } from "../components/article-item";
import { Container } from "../components/container";
import { Navigation } from "../components/navigation";
import { commitSession, getSession } from "../sessions";
import { ArticleListPageProps, Meta } from "../types";
import matter from "../utils/matter";

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const body = new URLSearchParams(await request.text());

  const url = new URL(request.url);
  url.searchParams.delete("_data");
  if (body.has("page")) {
    url.searchParams.set("page", body.get("page") as string);
  }
  const redirectUrl = url.toString();

  if (request.method.toUpperCase() !== "POST") {
    session.flash("errror", "Unsupported method.");
    return redirect(redirectUrl, {
      status: 405,
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  const question = body.get("question");

  if (!question) {
    session.flash("error", "The question is required.");
    return redirect(redirectUrl, {
      status: 400,
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  const octokit = new Octokit({ auth: process.env.GH_TOKEN as string });
  const title = question.length > 75 ? question.slice(0, 75) + "..." : question;

  try {
    await octokit.request("POST /repos/{owner}/{repo}/issues", {
      owner: process.env.GH_USERNAME as string,
      repo: process.env.GH_AMA_REPO as string,
      title,
      body: question,
      assignees: [process.env.GH_USERNAME as string],
    });
    session.flash("success", "Question created");
    return redirect(redirectUrl, {
      status: 201,
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    session.flash("error", error.message);
    return redirect(redirectUrl, {
      status: 400,
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const url = new URL(request.url);

  const page = Number(url.searchParams.get("page") ?? 1);
  const error = session.get("error");
  const success = session.get("success");

  console.log({ success, error });

  const cn = collectedNotes(
    process.env.CN_EMAIL as string,
    process.env.CN_TOKEN as string
  );

  const { site, notes } = await cn.site(
    process.env.CN_SITE_PATH as string,
    page,
    "public_site"
  );

  return json(
    {
      page,
      totalPages: Math.ceil(site.total_notes / 40),
      error,
      success,
      notes: notes
        .map((note) => [note, matter(note.body).data as Meta] as const)
        .map(([note, meta]) => ({
          ...note,
          meta: {
            title: note.title,
            description: meta.description ?? "",
            date: new Date(meta.date).toJSON() ?? note.created_at,
            slug: `/articles/${note.path}`,
            tags: meta.tags ?? "",
          },
        })),
    },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
};

export const handle = {
  hydrate: true,
};

export default function View() {
  const { notes, page, totalPages, success, error } = useRouteData<ArticleListPageProps>();

  return (
    <section className="space-y-6 mb-12">
      <header>
        <Container>
          <Navigation
            current="articles"
            title="Articles"
            description="All the articles I have wrote in my career"
          />
        </Container>
      </header>

      <Container>
        <div className="mx-auto relative rounded-lg">
          <AMAForm success={success} error={error} page={page} />
          <p>{success}</p>
          <p>{error}</p>
        </div>
      </Container>

      <Container>
        <section className="divide-y divide-gray-200 dark:divide-gray-800">
          {notes.map(function mapToArticleItem(article) {
            return <ArticleItem key={article.id} article={article.meta} />;
          })}
        </section>
      </Container>

      <Container>
        <nav aria-label="Pagination" className="flex justify-evenly pb-8">
          <NavLink
            to={`/articles?page=${page + (page !== totalPages ? 1 : 0)}`}
            className="text-blue-500 font-medium underline hover:no-underline"
          >
            Older
          </NavLink>

          <NavLink
            to={`/articles?page=${page - (page !== 1 ? 1 : 0)}`}
            className="text-blue-500 font-medium underline hover:no-underline"
          >
            Newer
          </NavLink>
        </nav>
      </Container>
    </section>
  );
}
