import Book from "../models/Book";

export const validateDateBook = async (datetime: Date) => {
    const existingBookDate = await Book.findOne({ datetime });
    if (existingBookDate) {
        return true;
    }
    return false;
};
