import EventPage from '@/components/eventPage';
import { getEvents, getCircles } from '@/notion';

export default EventPage;

export async function getStaticPaths() {
    const events = await getEvents();
    return {
        paths: Object.keys(events).map((key) => ({ params: { index: key } })),
        fallback: true
    };
}

export async function getStaticProps() {
    const [events, circles] = await Promise.all([getEvents(), getCircles()]);
    return {
        props: {
            events,
            circles
        }
    };
}
