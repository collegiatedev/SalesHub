export const retrieveField = (data: any, title: string) => {
  return data.payload.fields.reduce((acc: any, field: any) => {
    if (field.title === title) return field.answer.value;
    return acc;
  }, "");
};
