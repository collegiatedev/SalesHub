// forces me to standardize naming
// have all interfaces extend this
export type GoogleAPI = {
  googleClient: any;
};

import fs from "fs-extra";

export type FileUpload = {
  folderId?: string;
  fileName: string;
  mimeType: string;
  fileStream: fs.ReadStream;
};
