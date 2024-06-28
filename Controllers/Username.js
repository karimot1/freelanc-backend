const Username = require('../Model/UsernameModel');

const Users = async (req, res) => {
  const { usernames } = req.body;

  try {
    if (!usernames) {
      return res.status(400).send({ message: "The field is mandatory" });
    }

    const validateNewUsers = await Username.findOne({ usernames });

    if (validateNewUsers) {
      return res.status(400).send({ message: "User already exists" });
    } else {
      const createUsername = await Username.create({
        usernames
      });

      if (createUsername) {
        return res.status(201).send({
          message: `Username created successfully for ${createUsername.usernames}`,
          status: "success",
          userId: createUsername._id // Send user ID in response
        });
      } else {
        return res.status(400).send({ message: "Unable to create username"  });
      }
    }
  } catch (error) {
    console.error('Error creating username:', error);
    return res.status(500).send({ message: "Internal server error" });
  }
};


const getUsernames = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({ message: 'ID is not provided' });
  }

  try {
    const getUser = await Username.findById(id);

    if (!getUser) {
      return res.status(404).send({ message: "Username not found", status: 'false' });
    } else {
      console.log('Username found:', getUser);
      return res.status(200).send({ message: "Username successfully fetched", status: "okay", username: getUser  });
    }
  } catch (error) {
    console.error('Server error', error);
    return res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = {Users,getUsernames};
