import * as React from "react";
import { GetStaticProps } from "next";
import fs from "fs";
import { promisify } from "util";
import { resolve } from "path";
import { Resume, Skill, Language, Basics, Work } from "types/resume";
import useResume from "data/resume";
import Navigation from "components/navigation";

const readFile = promisify(fs.readFile);

const formatDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
}).format;

interface Props {
  resume: Resume;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const resume: Resume = JSON.parse(
    await readFile(resolve("./resume.json"), "utf-8")
  );

  return {
    props: {
      resume,
    },
  };
};

export default function ResumePage({ resume: _resume }: Props) {
  const { data: resume } = useResume(_resume);

  return (
    <>
      <Navigation />
      <main className="max-w-screen-lg mx-auto px-4 space-y-8 mb-8">
        <BasicsSection {...resume.basics} />
        <SkillsSection skills={resume.skills} />
        <WorksSection experiences={resume.work} />
        <LanguagesSection languages={resume.languages} />
      </main>
    </>
  );
}

function SectionWrapper({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4" id={id}>
      {children}
    </section>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-2xl leading-none">{children}</h3>;
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return <h4 className="text-sm md:text-lg leading-none">{children}</h4>;
}

function SectionContent({ children }: { children: React.ReactNode }) {
  return <section className="space-y-4 md:pl-4">{children}</section>;
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <small className="bg-yellow-500 hover:bg-black text-black hover:text-yellow-500 py-1 px-3 mr-2 my-1 leading-none text-xs">
      {children}
    </small>
  );
}

function SkillsSection(props: { skills: Skill[] }) {
  return (
    <SectionWrapper id="section-skills">
      <SectionTitle>Skills</SectionTitle>
      <SectionContent>
        {props.skills.map((skill) => (
          <article key={skill.name}>
            <SubTitle>{skill.name}</SubTitle>
            <div className="flex items-center flex-wrap">
              {skill.keywords.map((keyword) => (
                <Tag key={keyword}>{keyword}</Tag>
              ))}
            </div>
          </article>
        ))}
      </SectionContent>
    </SectionWrapper>
  );
}

function LanguagesSection(props: { languages: Language[] }) {
  return (
    <SectionWrapper id="section-languages">
      <SectionTitle>Languages</SectionTitle>
      <SectionContent>
        {props.languages.map((language) => (
          <article key={language.language}>
            <SubTitle>
              {language.language}{" "}
              <small className="font-hairline">({language.fluency})</small>
            </SubTitle>
          </article>
        ))}
      </SectionContent>
    </SectionWrapper>
  );
}

function BasicsSection({
  name,
  email,
  website,
  profiles,
  summary,
  location,
}: Basics) {
  return (
    <SectionWrapper id="section-basics">
      <h1 className="font-semibold text-2xl tracking-widest leading-none">
        {name}
      </h1>
      <div className="space-y-2 leading-none">
        <address className="block not-italic">
          Based on{" "}
          <strong className="text-yellow-500 font-semibold">
            {location.city}, {location.region}
          </strong>
        </address>
        <a
          href={website}
          title="Personal website"
          className="block underline text-yellow-500 tracking-wider"
        >
          {website.slice(8)}
        </a>
        <a
          href={email}
          title="Email address"
          className="block underline text-yellow-500 tracking-wider"
        >
          {email}
        </a>
      </div>
      <blockquote className="border-l-4 border-yellow-500 pl-4 -ml-4 whitespace-pre-wrap leading-relaxed text-sm">
        {summary}
      </blockquote>
      <div className="md:flex md:flex-no-wrap md:space-x-8 space-y-2 md:space-y-0">
        {profiles.map((profile) => (
          <div key={profile.network} className="space-x-2">
            <strong>{profile.network}</strong>
            <a
              href={profile.url}
              title={profile.network}
              className="underline text-yellow-500 tracking-wider"
            >
              @{profile.username}
            </a>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

function WorksSection({ experiences }: { experiences: Work[] }) {
  const groupedExperiences = experiences.reduce((works: Work[][], work) => {
    if (
      works.length > 0 &&
      work.company === works[works.length - 1][0].company
    ) {
      works[works.length - 1].push(work);
    } else {
      works.push([work]);
    }
    return works;
  }, []);

  return (
    <SectionWrapper id="section-work">
      <SectionTitle>Experience</SectionTitle>
      {groupedExperiences.map((companyGroup: Work[]) => (
        <SectionContent key={JSON.stringify(companyGroup)}>
          <SubTitle>{companyGroup[0].company}</SubTitle>
          <div>
            {companyGroup.map((experience, index) => (
              <div
                key={JSON.stringify(experience)}
                className="items-center grid max-w-sm"
                style={{
                  gridTemplateAreas:
                    "'dot position . date' 'line body body body'",
                  gridTemplateColumns: "25px 1fr 10px 160px",
                  gridTemplateRows: "40px minmax(1rem, 1fr)",
                }}
              >
                <Dot />
                <strong
                  className="leading-none font-semibold text-sm md:text-md"
                  style={{ gridArea: "position" }}
                >
                  {experience.position}
                </strong>
                {experience.startDate ? (
                  experience.endDate ? (
                    <em
                      className="text-light not-italic text-xs text-right"
                      style={{ gridArea: "date" }}
                    >
                      {formatDate(new Date(experience.startDate))}
                      {" - "}
                      {formatDate(new Date(experience.endDate))}
                    </em>
                  ) : (
                    <em
                      className="text-light not-italic text-xs text-right"
                      style={{ gridArea: "date" }}
                    >
                      {formatDate(new Date(experience.startDate))} - Current
                    </em>
                  )
                ) : null}
                {index < companyGroup.length - 1 && <Line />}
                {experience.summary && (
                  <p className="hidden md:block text-sm" style={{ gridArea: "body" }}>{experience.summary}</p>
                )}
              </div>
            ))}
          </div>
        </SectionContent>
      ))}
    </SectionWrapper>
  );
}

function Line() {
  return (
    <div
      className="bg-yellow-500 w-1 h-full ml-1"
      style={{ gridArea: "line" }}
    />
  );
}

function Dot() {
  return (
    <div
      className="bg-yellow-500 rounded-full w-3 h-3"
      style={{ gridArea: "dot" }}
    />
  );
}
