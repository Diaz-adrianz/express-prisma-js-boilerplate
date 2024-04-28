import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.router.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRouter);
app.use('*', (req, res) => {
	res.status(404).json({
		message: 'Path not found',
	});
});

app.listen(port, () => {
	console.log(`Express app is running in port ${port}`);
});
