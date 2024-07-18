const { cloudinary } = require("../config/Cloudinary");
const profileinfoModel = require("../Model/ProfileinfoModel");

const createProfileinfo = async (req, res) => {
    const { JobType, Experience, AboutMe, Education, Salary, JobImage, JobCategory } = req.body;

    if (!JobType || !Experience || !AboutMe || !Education || !Salary || !JobImage || !JobCategory) {
        return res.status(400).send({ message: "All fields are required" });
    }

    try {
        const imageUpload = await cloudinary.uploader.upload(JobImage, {
            folder: "profileinfo",
        });

        const postLink = imageUpload.secure_url;
        console.log("postlink:", postLink);

        const createPostProject = await profileinfoModel.create({
          JobType,
            Experience,
            AboutMe,
            Education,
            Salary,
            JobImage: postLink,
            JobCategory
        });

        if (createPostProject) {
            return res.status(200).send({ message: "You have successfully created your post project", status: true });
        } else {
            return res.status(400).send({ message: "Unable to post project" });
        }
    } catch (error) {
        console.error("Error creating post project:", error);
        return res.status(500).send({ message: "Server error", error });
    }
};

module.exports = { createProfileinfo };
