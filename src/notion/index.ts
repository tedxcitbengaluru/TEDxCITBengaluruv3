import { Client, isFullPage } from '@notionhq/client';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import {
    formatTeam,
    formatSpeakers,
    formatEvents,
    formatCircles,
    formatSponsors,
    formatHome,
    formatSocial,
    formatAbout,
    formatFounders
} from './format';

const notion = new Client({
    auth: process.env.NOTION_TOKEN
});

const getWebsitePage = async (page_id: string) => {
    const page = await notion.pages.retrieve({ page_id });
    console.log(page);
};

const convertNotionPage = (page: PageObjectResponse) => {
    // console.log(JSON.stringify(page.properties, null, 4));
    const properties = Object.keys(page.properties).reduce((prev, curr) => {
        let value: any = null;
        const property = page.properties[curr];
        if (property.type === 'number') value = property.number;
        else if (property.type === 'title' && property.title.length)
            value = property.title[0].plain_text;
        else if (property.type === 'date') value = property.date;
        else if (property.type === 'rich_text' && property.rich_text.length)
            value = property.rich_text[0].plain_text;
        else if (
            property.type === 'files' &&
            property.files.length &&
            property.files[0].type === 'file'
        )
            value = property.files[0].file.url;
        else if (
            property.type === 'files' &&
            property.files.length &&
            property.files[0].type === 'external'
        )
            value = property.files[0].external.url;
        else if (property.type === 'select') value = property.select?.name;
        else if (property.type === 'multi_select')
            value = property.multi_select.map((ms) => ms.name);
        else if (property.type === 'url') value = property.url;
        else if (property.type === 'checkbox') value = property.checkbox;
        else if (
            property.type === 'rollup' &&
            property.rollup.type === 'array' &&
            property.rollup.array.length
        ) {
            if (property.rollup.array[0].type === 'title' && property.rollup.array[0].title.length)
                value = property.rollup.array[0].title[0].plain_text;
            // @ts-ignore
            else if (property.rollup.array[0].type === 'number')
                // @ts-ignore
                value = property.rollup.array[0].number;
            // @ts-ignore
            else if (property.rollup.array[0].type === 'date')
                // @ts-ignore
                value = property.rollup.array[0].date;
            else if (
                property.rollup.array[0].type === 'rich_text' &&
                property.rollup.array[0].rich_text.length
            )
                value = property.rollup.array[0].rich_text[0].plain_text;
        } else {
            return prev;
        }

        return { ...prev, [curr.toLowerCase().replace(new RegExp(' ', 'g'), '_')]: value };
    }, {});
    return properties;
};

const getDatabase = async (database_id: string) => {
    const eventPages = (await notion.databases.query({ database_id })).results;

    const events: any[] = [];
    eventPages.forEach((page) => {
        if (isFullPage(page)) {
            events.push(convertNotionPage(page));
        }
    });
    return events;
};

export const getEvents = async () => {
    return formatEvents(await getDatabase(process.env.EVENTS_DB as string));
};
export const getTeam = async () => {
    return formatTeam(await getDatabase(process.env.TEAM_DB as string));
};
export const getCircles = async () => {
    return formatCircles(await getDatabase(process.env.CIRCLES_DB as string));
};
export const getSpeakers = async () => {
    return formatSpeakers(await getDatabase(process.env.SPEAKERS_DB as string));
};
export const getSponsors = async () => {
    return formatSponsors(await getDatabase(process.env.SPONSORS_DB as string));
};

export const getHome = async () => {
    return formatHome(await getDatabase(process.env.HOME_DB as string));
};
export const getSocial = async () => {
    return formatSocial(await getDatabase(process.env.SOCIAL_DB as string));
};

export const getAbout = async () => {
    return formatAbout(await getDatabase(process.env.ABOUT_DB as string));
};

export const getFounders = async () => {
    return formatFounders(await getDatabase(process.env.FOUNDERS_DB as string));
};

// (async () => {
//     // const data = formatTeam(await getTeam());
//     // const data = formatSpeakers(await getSpeakers());
//     // const data = formatEvents(await getEvents());
//     // const data = formatCircles(await getCircles());
//     const data = formatSponsors(await getSponsors());
//     console.log(JSON.stringify(data, null, 4));
// })();
