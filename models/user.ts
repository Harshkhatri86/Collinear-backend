"use strict";

import { Model } from "sequelize";

interface UserInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: number;
  id : string ; 
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserInterface> implements User {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    public firstName!: string;
    public id! : string ;
    public lastName!: string;
    public email!: string;
    public password!: string;
    public phone!: number;
    static associate(models: any) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate:{
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        validate:{
          isNumeric: true, 
          len : [8, 12]
        }
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
