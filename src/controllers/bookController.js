import {catchAsync} from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import bookModule from "../models/bookModel.js";
import bookModel from "../models/bookModel.js";

// get all authors
const getAllBooks = catchAsync(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const { rows, totalItems } = await bookModule.findAll(page, limit);

    if (rows.length === 0) {
        return next(new AppError("No books found", 404));
    }

    res.status(200).json({
        data: rows,
        pagination: {
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page,
            pageSize: limit,
        },
    });
});

// get book with authors, categories, and reviews
const getBookById = catchAsync(async (req, res, next) => {
    const bookId = req.params.id;
    console.log(`Getting book with authors, categories, and reviews for id: ${bookId}`);

    const rows = await bookModel.findById(bookId);

    if (rows.length === 0) {
        return next(new AppError("Book not found", 404));
    }

    // Transform rows into nested JSON
    const book = {
        id: rows[0].bookId,
        title: rows[0].title,
        isbn: rows[0].isbn,
        publication_date: rows[0].publication_date,
        description: rows[0].description,
        page_count: rows[0].page_count,
        created_at: rows[0].bookCreatedAt,
        updated_at: rows[0].bookUpdatedAt,
        author: {
            id: rows[0].authorId,
            first_name: rows[0].authorFirstName,
            last_name: rows[0].authorLastName,
            biography: rows[0].authorBio,
        },
        publisher: {
            id: rows[0].publisherId,
            name: rows[0].publisherName,
            email: rows[0].publisherEmail,
        },
        categories: [],
        reviews: [],
    };

    const categories = new Map();
    const reviews = new Map();

    rows.forEach((row) => {
        if (row.categoryId && !categories.has(row.categoryId)) {
            categories.set(row.categoryId, {
                id: row.categoryId,
                name: row.categoryName,
                description: row.categoryDescription,
            });
        }
        if (row.reviewId && !reviews.has(row.reviewId)) {
            reviews.set(row.reviewId, {
                id: row.reviewId,
                rating: row.rating,
                comment: row.comment,
                review_date: row.review_date,
                created_at: row.reviewCreatedAt,
                user: {
                    id: row.userId,
                    username: row.reviewUser,
                },
            });
        }
    });

    book.categories = Array.from(categories.values());
    book.reviews = Array.from(reviews.values());

    res.status(200).json(book);
});

// create new book
const createBook = catchAsync(async (req, res, next) => {
    const {title,isbn,publicationDate,description,pageCount,AuthorsId,publishersId,categoryIds} = req.body;
    console.log("Creating new author", title);

    // check book exists
    const iExists = await bookModel.isBookExists(title);

    if(iExists){
        return next(new AppError("Book is already exists", 400));
    }

    const id = await bookModel.create(title,isbn,publicationDate,description,pageCount,AuthorsId,publishersId,categoryIds);
    res.status(201).json({success:true,author_id:id});

});

// update book
const updateBook = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const {title,isbn,publicationDate,description,pageCount,AuthorsId,publishersId,categoryIds} = req.body;
    console.log("updating book", id);

    const changedRows = await bookModel.update(title,isbn,publicationDate,description,pageCount,AuthorsId,publishersId,categoryIds,id);

    if (changedRows === 0) {
        throw new AppError("Book not found or no changes made", 404);
    }

    res.status(200).json({success:true,message: "Book updated successfully"});


});

// delete book
const deleteBook = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    console.log("Deleting book", id);

    const affectedRows = await bookModel.deleteBook(id);

    if(affectedRows === 0){
        return next(new AppError("Book not found", 404));
    }

    res.status(200).json({success:true,message: "Book deleted successfully"});

})

// search books
const searchBooks = catchAsync(async (req, res, next) => {
    const { title, author, category, page, limit } = req.query;
    console.log("searching books");
    const books = await bookModel.searchBooks({ title, author, category, page, limit });

    res.status(200).json({
        success: true,
        results: books.length,
        books
    });
});

// upload cover
const uploadBookCover = catchAsync(async (req, res, next) => {
    const bookId = req.params.id;

    if (!req.file) {
        return next(new AppError("No file uploaded", 400));
    }

    const coverPath = req.file.path;

    const affectedRows = await bookModel.updateBookCover(bookId, coverPath);

    if (affectedRows === 0) {
        return next(new AppError("Book not found", 404));
    }

    res.status(200).json({
        success: true,
        message: "Book cover uploaded successfully",
        coverPath,
    });
});

export default {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    searchBooks,
    uploadBookCover
}