const express = require('express');
const router = express.Router();
const fs = require('fs');

const dir = "./messages";

router.get('/', (req, res) => {
	fs.readdir(dir, (err, files) => {
		if (err) throw err;
		const messages = [];

		files.forEach(file => {
			const filePath = dir + '/' + file;
			const data = fs.readFileSync(filePath);
			messages.push(JSON.parse(data));
		});
		res.send(messages.reverse().slice(0, 5));
	});
});

router.post('/', (req, res) => {
	const dateTime = new Date().toISOString();
	const fileName = dir + '/' + dateTime + '.txt';
	const reqBody = req.body;
	reqBody.dateTime = dateTime;
	fs.writeFile(fileName, JSON.stringify(reqBody), err => {
		if (err) {
			console.error(err);
		} else {
			console.log('File was saved!');
		}
	});
	res.send(reqBody);
});


module.exports = router;