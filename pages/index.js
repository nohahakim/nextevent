import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  console.log(featuredEvents);

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800, // Revalidate every 30 minutes
  };
}

export default function HomePage(props) {
  return (
    <div>
      <h1>Featured Events</h1>
      <EventList items={props.events} />
    </div>
  );
}
