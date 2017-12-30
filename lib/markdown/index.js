import { parse } from 'himalaya';

import mdParser from './parser';
import mapElement from './map-element';

export default md => parse(mdParser(md)).map(mapElement);
