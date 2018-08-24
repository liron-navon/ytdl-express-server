import * as isObject from 'lodash/isObject';

export interface PageInfo {
    totalResults: number;
    resultsPerPage: number;
}

export interface Thumbnail {
    url: string;
    width: number;
    height: number;
}

export interface YoutubeVideoDescriptor {
    id: string;
    title: string;
    channelId: string;
    channelTitle: string;
    description: string;
    publishedAt: string;
    thumbnails: {
        default: Thumbnail,
        medium: Thumbnail,
        high: Thumbnail
    };
}

export interface YoutubeSearchResult {
    nextPageToken: string;
    regionCode: string;
    pageInfo: PageInfo;
    items: YoutubeVideoDescriptor[];
}

export function normalizeVideoSearch(rawResponse: any): YoutubeSearchResult {
    return {
        nextPageToken: rawResponse.nextPageToken,
        regionCode: rawResponse.regionCode,
        pageInfo: {
            totalResults: rawResponse.totalResults,
            resultsPerPage: rawResponse.resultsPerPage
        },
        items: rawResponse.items.map(({ id, snippet }) => {
            return {
                id: isObject(id) ? id.videoId : id,
                title: snippet.title,
                description: snippet.description,
                channelId: snippet.channelId,
                channelTitle: snippet.channelTitle,
                thumbnails: snippet.thumbnails,
                publishedAt: snippet.publishedAt,
            };
        })
    };
}