// src/models/npc.ts
import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
  } from 'sequelize';
  import sequelize from '../database';
  
  export class Creature extends Model<
    InferAttributes<Creature>,
    InferCreationAttributes<Creature>
  > {
    declare id: CreationOptional<number>;
    declare name: string;
    declare creatureName: string;
    declare creatureFamily: string | null;
    declare hp: number;
    declare level: number;
    declare location: string | null;
    declare aligment: string | null;
    declare description: string | null;
    declare traits: string[];
    declare created: Date | null;
  }
  
  Creature.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      creatureName: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      creatureFamily: {
        type: DataTypes.STRING(64),
        allowNull: true,
      },
      hp: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      level: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      aligment: {
        type: DataTypes.STRING(8),
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      traits: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
      },
      created: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Creature',
      tableName: 'creatures',
      timestamps: false,
    }
  );
  
  export default Creature;
  