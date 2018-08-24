import { proxify } from 'helpers/proxify';
import { Request } from 'express';

const AUDIO_FILE_NOTE = 'DASH audio';
const DEFAULT_IMAGE = 'https://dc-cdn.s3-ap-southeast-1.amazonaws.com/dc-Cover-kjf3fen2qi100no5fni8t20ll0-20160709115754.Medi.jpeg';

export interface YTDLInfo {
    uploader: string;
    id: string;
    format: string;
    formats: {
        link: string,
        extension: string
    }[];
    title: string;
    description: string;
    tags: string[];
    categories: string[];
    image: string;
    sourcePage: string;
    duration: number;
    views: number;
    likes: number;
    dislikes: number;
    rating: number;
    uploadTime: string;
    height: number;
    width: number;
    fileName: string;
    extension: string;
    sourceUrl: string;
    codec: string;
    extractor: string;
}

export function processYTDLInfo(request: Request, info: any, type: string): YTDLInfo {
    let formats = info.formats;
    if (type !== 'all') {
        // filter to get audio/ video only
        const audioOnly = (type === 'audio');
        formats = formats.filter(f => {
            if (audioOnly) {
                return f.format_note === AUDIO_FILE_NOTE;
            } else {
                return f.format_note !== AUDIO_FILE_NOTE;
            }
        });
    }

    // map the formats to get only what we need
    formats = formats.map(f => {
        return {
            link: proxify(request, f.url),
            extension: f.ext
        };
    });

    const previewImage = info.thumbnails && info.thumbnails.length ? info.thumbnails[0].url : DEFAULT_IMAGE;

    return {
        uploader: info.uploader,
        id: info.display_id,
        format: info.format_id,
        formats: formats,
        title: info.fulltitle,
        description: info.description,
        tags: info.tags,
        categories: info.categories,
        image: previewImage,
        sourcePage: info.webpage_url,
        duration: info._duration_raw,
        views: info.view_count,
        likes: info.like_count,
        dislikes: info.dislike_count,
        rating: info.average_rating,
        uploadTime: info.upload_date,
        height: info.height,
        width: info.width,
        fileName: info._filename,
        extension: info.ext,
        sourceUrl: proxify(request, info.url),
        codec: info.acodec,
        extractor: info.extractor
    };
}