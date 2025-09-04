import {catchAsync} from "../utils/catchAsync.js";
import reviewModel from "../models/reviewModel.js";
import bookModel from "../models/bookModel.js";
import AppError from "../utils/AppError.js";

// get reviews for book
const getReviewsForBook = catchAsync(async (req, res, next) => {
    const bookId = parseInt(req.params.id);
    console.log("Getting reviews for book: ", bookId);

    const reviews = await reviewModel.findReviewsByBookId(bookId);

    if (reviews.length === 0) {
        return res.status(200).json({
            success: true,
            results: 0,
            reviews: []
        });
    }

    res.status(200).json({
        success: true,
        results: reviews.length,
        reviews
    });
});

// create new review
const createReview = catchAsync(async (req, res, next) => {
    const bookId = parseInt(req.params.id);
    const { rating, comment,userId } = req.body;
    console.log("Creating new review for", bookId);

    const isBookExist = await bookModel.isBookExistsById(bookId);

    if(!isBookExist){
        return next(new AppError("Invalid book id", 400));
    }

    const reviewId = await reviewModel.create({ bookId, userId, rating, comment });

    res.status(201).json({
        success: true,
        message: "Review added successfully",
        reviewId
    });

});

// update author
const updatereview = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const {rating, comment} = req.body;
    console.log("updating review", id);

    const changedRows = await reviewModel.update(rating, comment,id);

    if(changedRows === 0){
        return next(new AppError("Review not found or no changes made", 404));
    }

    res.status(200).json({success:true,message: "Review updated successfully"});


});

// delete review
const deleteReview = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    console.log("Deleting review", id);

    const affectedRows = await reviewModel.deleteReview(id);

    if(affectedRows === 0){
        return next(new AppError("Review not found", 404));
    }

    res.status(200).json({success:true,message: "Review deleted successfully"});

})

export default {
    getReviewsForBook,
    createReview,
    updatereview,
    deleteReview,
}