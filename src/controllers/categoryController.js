import {catchAsync} from "../utils/catchAsync.js";
import categoryModel from "../models/categoryModel.js";
import AppError from "../utils/AppError.js";

// get all categories
const getAllCategories = catchAsync(async (req, res, next) => {
    console.log("Getting all categories");

    const categories = await categoryModel.findAll();

    if(categories.length === 0){
        return next(new AppError('No categories found',404));
    }

    res.status(200).json(categories);
});

// get category with associated books
const getCategoryById = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    console.log(`Getting category with associated books for id: ${id}`);

    const category = await categoryModel.findById(id);

    if (!category) {
        return next(new AppError(`No category found for id:${id}`,404));
    }

    res.status(200).json(category);
});

// create new category
const createCategory = catchAsync(async (req, res, next) => {
    const {name, description} = req.body;
    console.log("Creating new category", name);

    try {

        const id = await categoryModel.create(name, description);
        res.status(201).json({success:true,category_id:id});

    }catch(err){

        if(err.code === "ER_DUP_ENTRY"){ // check duplicate category
            return next(new AppError(`Category ${name} already exist`, 400));
        }
        next(err); // other errors
    }
});

// update category
const updateCategory = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const {name, description} = req.body;
    console.log("updating category", id);

    try {

        const changedRows = await categoryModel.update(name, description,id);

        if(changedRows === 0){
            return next(new AppError("Category not found or no changes made", 404));
        }

        res.status(200).json({success:true,message: "Category updated successfully"});

    }catch(err){

        if(err.code === "ER_DUP_ENTRY"){ // check duplicate category
            return next(new AppError(`Category ${name} already exist`, 400));
        }
        next(err); // other errors
    }
});

// delete category
const deleteCategory = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    console.log("Deleting category", id);

    // check foreign key constraints
    const inUse = await categoryModel.isCategoryInUse(id);

    if(inUse){
        return next(new AppError("Category is linked to books and cannot be deleted", 400));
    }

    const affectedRows = await categoryModel.deleteCategory(id);

    if(affectedRows === 0){
        return next(new AppError("Category not found", 404));
    }

    res.status(200).json({success:true,message: "Category deleted successfully"});

})

// grouped exports
export default {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}