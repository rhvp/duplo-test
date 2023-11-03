import { DataTypes } from "sequelize";
import { sequelize } from "../../../shared/db/sql";
import { UserInstance } from "../interface/user.interface";
import { utils } from "../../../shared/util";


const UserModel = sequelize.define<UserInstance>(
    'user',
    {
      id: {
          autoIncrement: false,
          primaryKey: true,
          type: DataTypes.UUID,
          unique: true,
          defaultValue: DataTypes.UUIDV4
      },
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      business_id: DataTypes.UUID,
      department: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {
      freezeTableName: true,
      underscored: true
    }
)

UserModel.beforeCreate(async(data:UserInstance) => {
  let {password} = data

  let hash = await utils.hashPassword(password);

  data.password = hash;
})

UserModel.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());

  delete values.password;
  return values;
}

export default UserModel;