// styled components

export const MyTitle = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <span className="mb-8">
      <h1 className="text-3xl font-bold">{title}</h1>
      {description && <p className="text-md italic mb-4 mt-1">{description}</p>}
    </span>
  );
};
