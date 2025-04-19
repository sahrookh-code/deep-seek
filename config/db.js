import mongoose from 'mongoose';

let cached = global.mongoose || {conn: null, promise: null};

export default async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!process.env.MONGODB_URI) {
        throw new Error('Please define the MONGODB_URI environment variable');
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        };

        cached.promise = mongoose.connect(process.env.MONGODB_URI, opts)
            .then((mongoose) => {
                console.log('Connected to MongoDB');
                return mongoose;
            })
            .catch((err) => {
                console.error('MongoDB connection error:', err);
                throw err;
            });
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw new Error(`Failed to connect to MongoDB: ${error.message}`);
    }

    return cached.conn;
}