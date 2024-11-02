
export interface Event {

    id: string;

    summary: string;

    start: { dateTime: string };

    end: { dateTime: string };

    description: string;

    location: string;

    htmlLink: string;

}