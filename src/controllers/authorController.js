
import {catchAsync} from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import authorModule from "../models/authorModel.js";
import nationalityModule from "../models/nationalityModel.js";

// get all authors
const getAllAuthors = catchAsync(async (req, res, next) => {
    console.log("Getting all authors");

    const authors = await authorModule.findAll();

    if(authors.length === 0){
        return next(new AppError('No authors found',404));
    }

    res.status(200).json(authors);
});

// get author with their books
const getAuthorById = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    console.log(`Getting author with their books for id: ${id}`);

    const author = await authorModule.findById(id);

    if (!author) {
        return next(new AppError(`No author found for id:${id}`,404));
    }

    res.status(200).json(author);
});

// create new author
const createAuthor = catchAsync(async (req, res, next) => {
    const {firstName,lastName,biography,birthDate,nationalityId} = req.body;
    console.log("Creating new author", firstName);

    // check author exists
    const iExists = await authorModule.isAuthorExists(firstName,lastName);

    if(iExists){
        return next(new AppError("Author is already exists", 400));
    }

    const isNationalityExists = await nationalityModule.isExistsById(nationalityId);

    if(!isNationalityExists){
        return next(new AppError("Nationality not exists", 404));
    }

    const id = await authorModule.create(firstName,lastName,biography,birthDate,nationalityId);
    res.status(201).json({success:true,author_id:id});

});

// update author
const updateAuthor = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const {firstName,lastName,biography,birthDate,nationalityId} = req.body;
    console.log("updating author", id);

    if(nationalityId){
        const isNationalityExists = await nationalityModule.isExistsById(nationalityId);

        if(!isNationalityExists){
            return next(new AppError("Nationality not exists", 404));
        }
    }

    const changedRows = await authorModule.update(firstName,lastName,biography,birthDate,nationalityId,id);

    if(changedRows === 0){
        return next(new AppError("Author not found or no changes made", 404));
    }

    res.status(200).json({success:true,message: "Author updated successfully"});


});

// delete author
const deleteAuthor = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    console.log("Deleting category", id);

    // check foreign key constraints
    const inUse = await authorModule.isAuthorInUse(id);

    if(inUse){
        return next(new AppError("Author is linked to books and cannot be deleted", 400));
    }

    const affectedRows = await authorModule.deleteAuthor(id);

    if(affectedRows === 0){
        return next(new AppError("Author not found", 404));
    }

    res.status(200).json({success:true,message: "Author deleted successfully"});

})

export default {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
}