import { YOUTUBE_API_KEY } from 'src/config';

function createYoutubeQuery(query: string) {
    return encodeURIComponent(`${query}-live`);
}

interface SearchParamsType {
    part?: string;
    type?: string;
    videoCategoryId?: number;
    maxResults?: number;
    key?: string;
    q?: string;
    chart?: string;
}

export const createYoutubeSearchParams = (query: string | null, options: SearchParamsType = {}): SearchParamsType => {
    const searchParams: SearchParamsType = Object.assign({
        part: 'snippet',
        type: 'video',
        videoCategoryId: 10,
        maxResults: 50,
        key: YOUTUBE_API_KEY
    }, options);

    if (query) {
        searchParams.q = createYoutubeQuery(query);
    }

    return searchParams;
};