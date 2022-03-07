const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

//create our User Model
class User extends Model {}

// define table columns and configuration
User.init(
  {
    //TABLE COLUMN DEFINITON HERE
    //define an id column
    id: {
      //  use the special Sequelize DataTypes object provide what type of data it is
      type: DataTypes.INTEGER,
      //this isthe equivalent of SQL's `NOT NULL` option
      allowNull: false,
      //Instruct that this is Primary Key
      primaryKey: true,
      // turn on auto increment
      autoIncrement: true,
    },
    // define username column
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //email column
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // if alowNull is set to false, run our data through validators before creating table data
      validate: {
        isEmail: true,
      },
    },
    // define a password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // thise means password must be atleast 4 characters long
        len: [4],
      },
    },
  },
  {
    // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))
    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    //dont automatically creatte createdAt/updatedAt timestamp fields
    timestamps: false,
    //dont pluralize name of database table
    freezeTableName: true,
    //use undercross instead of camel calsing (ex `comment_text` and not commentText)
    underscored: true,
    //make it so our model name stays lowercase in thge database
    modelName: "user",
  }
);

module.exports = User;
