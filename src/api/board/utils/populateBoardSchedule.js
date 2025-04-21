import Board from "../schemas";

export const populateBoardSchedule = (id) => {
  return Board.create({
    userId: String(id),
    columns: [
      {
        id: "newColumn",
        title: "New",
        cards: [],
      },
      {
        id: "progressColumn",
        title: "Progress",
        cards: [],
      },
      {
        id: "reviewColumn",
        title: "Review",
        cards: [],
      },
      {
        id: "doneColumn",
        title: "Done",
        cards: [],
      },
    ],
  });
};
