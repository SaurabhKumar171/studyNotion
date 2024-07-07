const mongoose = require("mongoose");

// Define the Purchase schema
const purchaseSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "user",
	},
	course: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Course",
	},
	purchaseDate: {
		type: Date,
		default: Date.now,
	},
	price: {
		type: Number,
		required: true,
	},
});

// Export the Purchase model
module.exports = mongoose.model("Purchase", purchaseSchema);
