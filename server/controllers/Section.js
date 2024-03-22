const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");
// CREATE a new section
exports.createSection = async (req, res) => {
	try {
		// Extract the required properties from the request body
		const { sectionName, courseId } = req.body;

		// Validate the input
		if (!sectionName || !courseId) {
			return res.status(400).json({
				success: false,
				message: "Missing required properties",
			});
		}

		// Create a new section with the given name
		const newSection = await Section.create({ sectionName });

		// Add the new section to the course's content array
		const updatedCourse = await Course.findByIdAndUpdate(
			courseId,
			{
				$push: {
					courseContent: newSection._id,
				},
			},
			{ new: true }
		)
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();

		// Return the updated course object in the response
		res.status(200).json({
			success: true,
			message: "Section created successfully",
			updatedCourse,
		});
	} catch (error) {
		// Handle errors
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};

// UPDATE a section
exports.updateSection = async (req, res) => {
	try {
		const { sectionName, sectionId, courseId } = req.body;
		const section = await Section.findByIdAndUpdate(
			sectionId,
			{ sectionName },
			{ new: true }
		);

		const course = await Course.findById(courseId).populate({
			path : "courseContent",
			populate : {
				path: "subSection",
			},
		}).exec();

		res.status(200).json({
			success: true,
			message: "section updated successfully",
			data: course,
		});
	} catch (error) {
		console.error("Error updating section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

// DELETE a section
exports.deleteSection = async (req, res) => {
	try {
		//HW -> req.params -> test
		const { sectionId, courseId } = req.body;
		await Course.findByIdAndUpdate(courseId,{
			$pull : {
				courseContent : sectionId,
			}
		})

		const section = await Section.findById(sectionId);
		if(!section){
			return  res.status(404).json({
				success:false,
				message: 'No such section exists'
			})
		}

		// Find all subsections of the section
		const subsectionsToDelete = section.subSection;
		//delete sub-section
		await SubSection.deleteMany({ _id: { $in: subsectionsToDelete } });
		await Section.findByIdAndDelete(sectionId);

		//find course and update
		const  updatedCourse = await Course.findById(courseId).populate({
			path: "courseContent",
			populate: {
				path : "subSection"
			}
		}).exec();

		res.status(200).json({
			success: true,
			message: "Section deleted successfully",
			data : updatedCourse,
		});
	} catch (error) {
		console.error("Error deleting section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};
