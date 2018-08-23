import { extractArrayFromJsonP } from '../jsonp';

export function youtubeAutocompleteResponseToArray(data) {
    const arrayOfData = extractArrayFromJsonP(data);
    console.log(JSON.stringify(arrayOfData))
    return reduceYoutubeAutoCompleteData(arrayOfData);
}

// reduces the response from youtube to a more readable format
function reduceYoutubeAutoCompleteData(data) {
    const [originalPhrase, phrasesData, key] = data;
    let phrases = phrasesData.map(p => {
        const [phrase, indicise] = p;
        return phrase;
    });
    phrases = phrases.filter(p => {
        return p !== originalPhrase;
    });
    return phrases;
}