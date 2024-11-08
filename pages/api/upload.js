import fs from 'fs';
import path from 'path';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

export default async (req, res) => {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.uploadDir = uploadDir;
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: 'Error parsing the file' });
        return;
      }

      const filePath = files.file.path;

      // Call the Python API with the uploaded file
      const result = await callPythonAPI(filePath);

      res.status(200).json({ result });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

const callPythonAPI = async (filePath) => {
  // Implement the logic to call the Python API with the file
  // and return the result
  return 'Infection status result from Python API';
};
