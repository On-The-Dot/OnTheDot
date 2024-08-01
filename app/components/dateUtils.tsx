import { format } from "date-fns";

export const updateMarkedDates = (
  tasks: any[],
  setMarkedDates: (dates: { [key: string]: any }) => void
) => {
  const dates: { [key: string]: any } = {};

  // Function to get the color based on priority
  const getColorByPriority = (priority: string) => {
    switch (priority) {
      case "high":
        return "red";
      case "medium":
        return "orange";
      case "low":
        return "yellow";
      default:
        return "grey";
    }
  };

  // Function to determine the highest priority color between two colors
  const getHighestPriorityColor = (color1: string, color2: string) => {
    const priorityOrder = ["grey", "yellow", "orange", "red"];
    const index1 = priorityOrder.indexOf(color1);
    const index2 = priorityOrder.indexOf(color2);
    return index1 > index2 ? color1 : color2;
  };

  tasks.forEach((task) => {
    const startDate = format(task.start_time.toDate(), "yyyy-MM-dd");
    const endDate = format(task.deadline.toDate(), "yyyy-MM-dd");
    const taskColor = getColorByPriority(task.priority);

    // Function to add or update the dot color for a given date
    const addOrUpdateDot = (date: string) => {
      if (!dates[date]) {
        dates[date] = { dots: [{ color: taskColor }] };
      } else {
        const existingColor = dates[date].dots[0].color;
        const highestColor = getHighestPriorityColor(existingColor, taskColor);
        dates[date].dots = [{ color: highestColor }];
      }
    };

    // Add or update dot for start and end dates
    addOrUpdateDot(startDate);
    addOrUpdateDot(endDate);

    // Add or update dots for the range of dates
    const dateRange = getDatesBetween(startDate, endDate);
    dateRange.forEach((date) => {
      addOrUpdateDot(date);
    });
  });

  setMarkedDates(dates);
};

export const getDatesBetween = (startDate: string, endDate: string) => {
  const dates = [];
  let currentDate = new Date(startDate);
  const stopDate = new Date(endDate);
  while (currentDate <= stopDate) {
    dates.push(format(currentDate, "yyyy-MM-dd"));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};
