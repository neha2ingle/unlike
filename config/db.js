import mongose from "mongose";

export const connectDB = async() => {
    try {
        const con = await mongose.connect(process.env.MONGO_URI);
        console.log(`mono DB connected ${conn.connection.host}`);
    }catch (error) {
        console.log(`error connecting Mondo DB ${error}`);
        process.exit(1);
    }
}