import { parse } from "himalaya";
import strip from "strip";

import mdParser from "./parser";
import mapElement from "./map-element";

export default md => {
  const html = mdParser(md);
  const plain = strip(html);
  const json = parse(html);
  const jsx = json.map(mapElement);

  jsx.plain = plain;
  return jsx;
};
