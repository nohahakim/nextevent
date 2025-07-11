import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import ErrorAlert from "../../components/ui/error-alert";
import Head from "next/head";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function FilteredEventsPage() {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();

  const filterData = router.query.slug;
  if (!filterData) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }
  let pageHeadData = (
    <Head>
      <title>A List of Filtered Events</title>
      <meta name="description" content="A list of filtered events" />
    </Head>
  );

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  const { data, error } = useSWR(
    "https://nextjs-course-8a8bb-default-rtdb.firebaseio.com/events.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
      const events = [];
      for (const key in data) {
        events.push({ id: key, ...data[key] });
      }
      setLoadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents) {
    return (
      <>
        {pageHeadData}
        <div className="center">
          <p>Loading...</p>
        </div>
      </>
    );
  }
  if (error) {
    return (
      <ErrorAlert>
        <p>Failed to load events!</p>
      </ErrorAlert>
    );
  }

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter!</p>
        </ErrorAlert>
      </>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <ErrorAlert>
        <p>No events found!</p>
      </ErrorAlert>
    );
  }

  const date = new Date(numYear, numMonth - 1);
  return (
    <>
      <Head>
        <title>
          Events for {date.toLocaleString("default", { month: "long" })}{" "}
          {numYear}
        </title>
        <meta
          name="description"
          content={`All events for ${date.toLocaleString("default", {
            month: "long",
          })} ${numYear}`}
        />
      </Head>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
}
