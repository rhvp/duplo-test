import { DataTypes } from "sequelize";
import { sequelize } from "../../../shared/db/sql";
import { BusinessInstance } from "../interface/business.interface";


const BusinessModel = sequelize.define<BusinessInstance>(
    'business',
    {
      id: {
          autoIncrement: false,
          primaryKey: true,
          type: DataTypes.UUID,
          unique: true,
          defaultValue: DataTypes.UUIDV4
      },
      name: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      freezeTableName: true,
      underscored: true
    }
)

export default BusinessModel;