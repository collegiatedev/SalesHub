export const notProvided = (info: string) => {
  return {
    paragraph: {
      rich_text: [
        {
          type: "text",
          text: {
            content: `${info} info not provided`,
            link: null,
          },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: "default",
          },
        },
      ],
      color: "default",
    },
  };
};

interface addTaskPropertiesProps {
  studentName: string;
  studentPageId: string;
  repPageId: string;
  taskName: string;
  taskId: string;
}
export const addTaskProperties = ({
  studentName,
  studentPageId,
  repPageId,
  taskName,
  taskId,
}: addTaskPropertiesProps) => {
  return {
    Name: {
      title: [
        {
          text: {
            content: `${studentName} - ${taskName}`,
          },
        },
      ],
    },
    "🚈 Lead": {
      relation: [
        {
          id: studentPageId,
        },
      ],
    },
    Assigned: {
      relation: [
        {
          id: repPageId,
        },
      ],
    },
    "🚅 Task": {
      relation: [
        {
          id: taskId,
        },
      ],
    },
  };
};
