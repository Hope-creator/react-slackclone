declare module Express {
    interface Request {
        userId: Schema.Types.ObjectId;
    }
}