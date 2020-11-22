export const memojis = {
  amazing: "Sergio with stars in his eyes",
  anger: "Sergio with anger",
  angry: "Sergio angry",
  approves: "Sergio approving with his hand",
  congrats: "Sergio celebrating",
  disappointed: "",
  disapproves: "",
  "face-palm": "",
  funny: "Sergio sticking out his tongue",
  happy: "Sergio happy",
  insult: "",
  laughing: "",
  luck: "",
  "mind-blown": "",
  nope: "",
  "open-mouth": "",
  pray: "",
  "raised-hand": "",
  "rolling-eyes": "",
  sad: "",
  scream: "",
  shrug: "",
  silence: "",
  sleeping: "",
  "sweat-smile": "",
  thinking: "Sergio thinking",
  victory: "",
  wink: "Sergio winking an eye",
  working: "Sergio behind a laptop",
};

export type MemojiName = keyof typeof memojis;

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  name: MemojiName;
}

export function Memoji({ name, style, ...props }: Props) {
  return (
    <img
      {...props}
      src={`/static/avatar/${name}.png`}
      alt={memojis[name]}
      style={{ filter: "drop-shadow(0 0 5px #ED8936", ...style }}
    />
  );
}
