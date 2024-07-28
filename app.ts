import 'dotenv/config';
import Server from './app/models/server';

const app = new Server;
app.listen();