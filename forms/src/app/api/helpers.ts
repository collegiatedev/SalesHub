export const getFieldValue = (label: string, fields: any): string => {
  const field = fields.find((f: any) => f.label === label);
  if (!field || !field.value) return "";

  switch (field.type) {
    case "MULTIPLE_CHOICE":
      return field.value
        .map(
          (value: string) =>
            field.options.find((option: any) => option.id === value)?.text
        )
        .join(", ");
    case "FILE_UPLOAD":
      // expected format for generator endpoint, double check shape lmao
      return field.value.map((file: any) => file.url).join(",");
    default:
      return field.value as string;
  }
};

export const withEndpoint = (url: string, reqUrl: string) => {
  const endpoint = new URL(url, reqUrl);
  return endpoint.toString();
};
