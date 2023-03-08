import EventPage from '@/components/eventPage';
import { getEvents, getCircles } from '@/notion';

export default EventPage;

export async function getStaticProps() {
    const [events, circles] = await Promise.all([getEvents(), getCircles()]);

    return {
        props: {
            events,
            circles
        },
        revalidate: 60
    };
}
