export const getFieldValue = (label: string, fields: any) => {
  const field = fields.find((f: any) => f.label === label);
  if (!field) return "";
  if (field.type === "MULTIPLE_CHOICE") {
    const selectedOptions = field.value.map(
      (value: string) =>
        field.options.find((option: any) => option.id === value)?.text
    );
    return selectedOptions.join(", ");
  }
  return field.value || "";
};

export const useEndpoint = (url: string, reqUrl: string) => {
  const endpoint = new URL(url, reqUrl);
  return endpoint.toString();
};
