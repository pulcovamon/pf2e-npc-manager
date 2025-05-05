import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    ForeignKey
  } from 'sequelize';
  import sequelize from '../database';
import Creature from './creature';
  
  export class Trait extends Model<
    InferAttributes<Trait>,
    InferCreationAttributes<Trait>
  > {
    declare id: CreationOptional<number>;
    declare name: string;
    declare creatureId: ForeignKey<Creature["id"]>;
  }
  
  Trait.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      creatureId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "creatures",
            key: "id",
        },
        onDelete: "CASCADE",
      }
    },
    {
      sequelize,
      modelName: 'Trait',
      tableName: 'traits',
    }
  );
  
  export default Trait;
  