export const notProvided = (info: string) => {
  return {
    paragraph: {
      rich_text: [
        {
          type: "text" as const,
          text: {
            content: `"${info}" info not provided`,
            link: null,
          },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: "default" as const,
          },
        },
      ],
      color: "default" as const,
    },
  };
};
