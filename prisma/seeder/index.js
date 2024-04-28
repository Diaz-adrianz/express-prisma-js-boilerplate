import { PrismaClient } from '@prisma/client';
import * as fs from 'fs/promises';

const prisma = new PrismaClient();

async function seedDatabase() {
	let files = [];

	try {
		files = await fs.readdir('./data');
	} catch (error) {
		console.error('ERR(read seeder data): ', error);
		return;
	}

	try {
		for (let file in files) {
			const jsonFile = await fs.readFile('./data/' + file, 'utf8');
			const data = JSON.parse(jsonFile);

			for (const dat of data) {
				await prisma[file.split('.')[0]].create({
					data: dat,
				});
			}

			console.log('DONE: seed ' + file);
		}
	} catch (error) {
		console.error('ERR(seed):', error);
	} finally {
		await prisma.$disconnect();
	}
}

seedDatabase();
