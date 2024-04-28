const Cart = require("../models/Cart")
const User = require("../models/User")

exports.addToCart = async (req,res) =>{
    try {
        const userId = req.user.id;
        const { courseId } = req.body;

        if(!courseId || !userId ) {
            return res.status(400).json({
                success : false,
                message : "Please provide data for course id and user id"
            })
        }

        // Find the user's cart or create one if it doesn't exist
        let cart = await Cart.findOne({ user: userId })
        if (!cart) {
            cart = new Cart({ user: userId, courses: [] });
        }

        // Add the course to the cart if it's not already there
        if (!cart.courses.includes(courseId)) {
            cart.courses.push(courseId);
        }

        // Save the updated cart
        await cart.save();

        res.status(200).json({
            success: true,
            message: "Course added to cart successfully",
            cart: cart // You can also return the updated cart if needed
        });

    } catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to add course to cart",
			error: error.message,
		});
    }
}


exports.fetchCartDetails = async (req,res) => {
    try {
        const userId = req.user.id;

        if(!userId)  
            throw new Error('User is not logged in'); 

        const cart = await Cart.findOne({user: userId})
        .populate("courses")
        .exec();

        // if(!cart){
        //     return res.status(401).json({
        //         success: false,
        //         message: 'No cart found for this user.'
        //     });
        // }

        res.status(200).json({
            success: true,
            message: "Fetched cart details successfully",
            cart: cart // You can also return the updated cart if needed
        });

    } catch (error) {
        console.error(error);
		res.status(500).json({
			success: false,
			message: "Could not fetch cart details",
			error: error.message,
		});
    }
}


exports.removeFromCart = async (req,res) => {
    try {
        const {courseId} = req.body;
        const userId = req.user.id;

        if(!courseId || !userId ) {
            return res.status(400).json({
                success : false,
                message : "Please provide data for course id and user id"
            })
        }

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'No cart found for this user.'
            });
        }

        // Check if the course exists in the cart
        const index = cart.courses.indexOf(courseId);
        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: 'Course not found in the cart.'
            });
        }

        // Remove the course from the cart
        cart.courses.splice(index, 1);

        // Save the updated cart
        await cart.save();

        res.status(200).json({
            success: true,
            message: "Course removed from cart",
            cart: cart
        });
        
    } catch (error) {
        console.error(error);
		res.status(500).json({
			success: false,
			message: "Could not remove course from cart",
			error: error.message,
		});
    }
}

exports.resetCart = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User has not logged in"
            });
        }

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(409).json({
                success: false,
                message: "No cart found for this user."
            });
        }

        // Reset the courses array in the cart
        if (cart.courses.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Cart is already empty."
            });
        }

        cart.courses = [];
        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Cart reset successfully",
            cart: cart
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Could not reset the cart",
            error: error.message
        });
    }
};