import * as trim from 'lodash/trim';
import * as trimEnd from 'lodash/trimEnd';
import * as trimStart from 'lodash/trimStart';

// extract an array of data from a jsonP response
export function extractArrayFromJsonP(jsonP) {
    const regexJsonpArray = /\(\[(.*?)\]\)/;
    const matches = regexJsonpArray.exec(jsonP);


    if (!matches || !matches.length) {
        return [];
    }

    let match = matches[0];
    match = trim(match, ' ');
    match = trimStart(match, '(');
    match = trimEnd(match, ')');

    return JSON.parse(match);
}