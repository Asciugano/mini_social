import dotenv from 'dotenv';
import { DataTypes } from 'sequelize';
import sequelize from '../lib/db.js'

dotenv.config();

const User = sequelize.define('user', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  },
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [6, 255],
    },
  },
  profile_pic: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: {
      isUrl: true,
    }
  }
});

export default User;
