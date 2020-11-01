import MarkdownIt from "markdown-it";
import { DaysInput } from "src/resolvers/types/whiteboardTypes";

export const createMarkdown = (days: DaysInput) => {
  type key = keyof typeof days;
  const md = new MarkdownIt({ html: true, breaks: true });

  let x = (Object.keys(days) as Array<key>).map((day: key) => {
    days[day] = {
      day,
      category: days[day].category,
      one: {
        title: md.render(days[day].one.title),
        workout: md.render(days[day].one.workout),
      },
      two: {
        title: md.render(days[day].two.title),
        workout: md.render(days[day].two.workout),
      },
      three: {
        title: md.render(days[day].three.title),
        workout: md.render(days[day].three.workout),
      },
    };

    return days[day];
  });

  return [x[0], x[1], x[2], x[3], x[4], x[5], x[6]];
};
