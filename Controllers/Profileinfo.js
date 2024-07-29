const { cloudinary } = require("../config/Cloudinary");
const profileinfoModel = require("../Model/ProfileinfoModel");
const userModel = require("../Model/UserModel");

const createProfileinfo = async (req, res) => {
    const { FirstName, LastName, Email, JobType, Experience, AboutMe, Education, Salary, JobImage, JobCategory } = req.body;

    if (!FirstName || !LastName || !Email || !JobType || !Experience || !AboutMe || !Education || !Salary || !JobImage || !JobCategory) {
        return res.status(400).send({ message: "All fields are required" });
    }

    try {
        const imageUpload = await cloudinary.uploader.upload(JobImage, {
            folder: "profileinfo",
        });

        const postLink = imageUpload.secure_url;
        console.log("postlink:", postLink);

        const user = await userModel.findOne({ FirstName, LastName, Email });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const createPostProject = await profileinfoModel.create({
            FirstName: user.FirstName,
            LastName: user.LastName,
            Email: user.Email,
            JobType,
            Experience,
            AboutMe,
            Education,
            Salary,
            JobImage: postLink,
            JobCategory
        });

        if (createPostProject) {
            return res.status(201).send({ message: "You have successfully created your post project", status: true, profile: createPostProject });
        } else {
            return res.status(400).send({ message: "Unable to post project" });
        }
    } catch (error) {
        console.error("Error creating post project:", error);
        return res.status(500).send({ message: "Server error", error: error.message });
    }
};

module.exports = { createProfileinfo };
