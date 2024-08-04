import axios from "axios";
import { SERVER_URL } from "./constants";

// generator api post, standardized

interface GeneratorEndpointParams<T> {
  route: string;
  body: T;
}
export const generatorEndpoint = async <T>({
  route,
  body,
}: GeneratorEndpointParams<T>) => {
  try {
    const endpoint = withEndpoint(route, SERVER_URL);
    const response = await axios.post(endpoint, body);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        `Error on ${route}:`,
        error.response?.data || error.message
      );
    } else {
      console.error(`Unexpected error on ${route}:`, error);
    }
    throw error;
  }
};

// tally parser helpers

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
      // expected format for generator endpoint
      return field.value.map((file: any) => file.url).join(", ");
    default:
      return field.value as string;
  }
};
// for handling fields that join multiple values with a comma (see above)
export const fieldToArray = (field: any): string[] => field.split(", ");

// call with endpoint
export const withEndpoint = (url: string, reqUrl: string) => {
  const endpoint = new URL(url, reqUrl);
  return endpoint.toString();
};
