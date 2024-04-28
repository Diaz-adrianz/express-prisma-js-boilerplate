import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
	console.log(`Express app is running in port ${port}`);
});
