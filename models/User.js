const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require('bcrypt');

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
      hooks: {
          async beforeCreate(newUserData) {
              newUserData.password = await bcrypt.hash(newUserData.password, 10);
                  return newUserData;
          },
          async beforeUpdate(updatedUserData) {
              updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
              return updatedUserData;
          }
      },
          sequelize,
          timestamps: false,
          freezeTableName: true,
          underscored: true,
          modelName: 'user'
      
  }
);

module.exports = User;
