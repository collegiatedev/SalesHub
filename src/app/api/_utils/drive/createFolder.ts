const createFolder = async (folderId: string) => {
  const fs = require("fs");
  const { GoogleAuth } = require("google-auth-library");
  const { google } = require("googleapis");
  // Get credentials and build service
  // TODO (developer) - Use appropriate auth mechanism for your app
  const auth = new GoogleAuth({
    scopes: "https://www.googleapis.com/auth/drive",
  });
  const service = google.drive({ version: "v3", auth });

  // TODO(developer): set folder
  // folderId = '1lWo8HghUBd-3mN4s98ArNFMdqmhqCXH7';
  const fileMetadata = {
    name: "photo.jpg",
    parents: [folderId],
  };
  const media = {
    mimeType: "image/jpeg",
    body: fs.createReadStream("files/photo.jpg"),
  };

  try {
    const file = await service.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: "id",
    });
    console.log("File Id:", file.data.id);
    return file.data.id;
  } catch (err) {
    // TODO(developer) - Handle error
    throw err;
  }
};
