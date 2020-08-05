import { setDBPathIn } from 'neon-bindings';
import { config } from 'dotenv';

config({});

process.env.NODE_ENV = 'test';

setDBPathIn(process.env.DATABASE_PATH || 'UNKNOWN.db');
