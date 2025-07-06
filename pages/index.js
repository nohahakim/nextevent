import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";
import Head from "next/head";

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
    <>
      <Head>
        <title>Next.js Events</title>

        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve"
        />
      </Head>
      <h1>Featured Events</h1>
      <EventList items={props.events} />
    </>
  );
}
