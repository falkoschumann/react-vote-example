export type Vote = Readonly<{
  id?: string;
  title: string;
  description: string;
  choices: Choice[];
}>;

export type Choice = Readonly<{
  id?: string;
  title: string;
  count: number;
}>;

export type UnsavedVote = Readonly<{
  title: string;
  description: string;
  choices: { title: string }[];
}>;
