import mongoose from 'mongoose';
import config from '../config.json';

export default function initialiseMongoDB():void {
    mongoose.connect(config.server.mongoDbURL);

    mongoose.set('strictQuery', true);

    mongoose.connection.on('connected', () => console.log("DataBase Connected"));
    mongoose.connection.on('disconnected', () => console.log("DataBase Disconnected"));
    mongoose.connection.on('error', (err) => console.log("DataBase Error: " + err));
}