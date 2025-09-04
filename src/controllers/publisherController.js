
import {catchAsync} from "../utils/catchAsync.js";
import publisherModule from "../models/publisherModel.js";
import AppError from "../utils/AppError.js";
import addressModule from "../models/addressModel.js";

// get all publishers
const getAllPublishers = catchAsync(async (req, res, next) => {
    console.log("Getting all publishers");

    const publishers = await publisherModule.findAll();

    if(publishers.length === 0){
        return next(new AppError('No publisher found',404));
    }

    res.status(200).json(publishers);
});

// get publisher with associated books
const getPublisherById = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    console.log(`Getting publisher with associated books for id: ${id}`);

    const category = await publisherModule.findById(id);

    if (!category) {
        return next(new AppError(`No publisher found for id:${id}`, 404));
    }

    res.status(200).json(category);
});

// create new publisher
const createPublisher = catchAsync(async (req, res, next) => {
    const {name,email,establishedYear,streetAddress, city, province,postalCode} = req.body;
    console.log("Creating new publisher", name);

    // check publisher exists
    const isExists = await publisherModule.isPublisherExists(name);

    if(isExists){
        return next(new AppError("Publisher is already exists", 400));
    }

    const id = await publisherModule.create(name,email,establishedYear,streetAddress, city, province,postalCode);
    res.status(201).json({success:true,author_id:id});

});

// update publisher
const updatePublisher = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const {name,email,establishedYear,addressId} = req.body;
    console.log("updating publisher", id);

    if(addressId){
        const isAddressExists = await addressModule.isExistsById(addressId);

        if(!isAddressExists){
            return next(new AppError("Address not exists", 404));
        }
    }

    const changedRows = await publisherModule.update(name,email,establishedYear,addressId,id);

    if(changedRows === 0){
        return next(new AppError("Publisher not found or no changes made", 404));
    }

    res.status(200).json({success:true,message: "Publisher updated successfully"});


});

// delete publisher
const deletePublisher = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    console.log("Deleting publisher", id);

    // check foreign key constraints
    const inUse = await publisherModule.isPublisherInUse(id);

    if(inUse){
        return next(new AppError("Publisher is linked to books and cannot be deleted", 400));
    }

    const affectedRows = await publisherModule.deletePublisher(id);

    if(affectedRows === 0){
        return next(new AppError("Publisher not found", 404));
    }

    res.status(200).json({success:true,message: "Publisher deleted successfully"});

})

export default {
    getAllPublishers,
    getPublisherById,
    createPublisher,
    updatePublisher,
    deletePublisher,
}