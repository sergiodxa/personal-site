export interface Resume {
  basics: Basics;
  work: Work[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
}

export interface Basics {
  name: string;
  label: string;
  email: string;
  website: string;
  summary: string;
  location: Location;
  profiles: Profile[];
}

export interface Location {
  city: string;
  region: string;
}

export interface Profile {
  network: string;
  username: string;
  url: string;
}

export interface Work {
  company: string;
  position: string;
  website: string;
  startDate: string;
  summary?: string;
  endDate?: string;
}

export interface Education {
  institution: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
}

export interface Skill {
  name: string;
  keywords: string[];
}

export interface Language {
  language: string;
  fluency: string;
}
