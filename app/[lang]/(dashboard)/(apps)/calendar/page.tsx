import { getCategories, getEvents } from "@/config/calendar.config";
import CalendarView from "./calender-view";

const CalenderPage = async () => {
  let events = [];
  let categories = [];

  try {
    const eventRes = await getEvents();
    const categoryRes = await getCategories();

    events = eventRes?.data || [];
    categories = categoryRes?.data || [];
  } catch (error) {
    console.error("Error fetching calendar data:", error);
  }
  const noData = (!events || events.length === 0) && (!categories || categories.length === 0);

  if (noData) {
    return (
      <div className="flex justify-center items-center h-64 text-2xl font-semibold text-gray-500">
        Coming Soon
      </div>
    );
  }

  return (
    <div>
      <CalendarView events={events} categories={categories} />
    </div>
  );
};

export default CalenderPage;
