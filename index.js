/* I have utilized ChatGPT as a resource for guidance and learning throughout this project. My approach reflects the growing trend of modern developers using AI tools to enhance their coding processes. However, all the final code presented here is my own work, based on own independently thought out prompts and without copying prompts or code from others other than snippets. I believe this practice aligns with the principles of academic honesty, as it emphasizes learning and using technology responsibly. */

var express = require('express');
var cors = require('cors');
var multer = require('multer'); // Import multer for handling file uploads
require('dotenv').config();

var app = express();

// Configure multer for handling file uploads
var upload = multer({ dest: 'uploads/' }); // 'uploads/' is the folder where files are temporarily stored

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Serve HTML file
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// File upload endpoint
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Send back file metadata as a JSON response
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
