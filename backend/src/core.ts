import { Op } from "sequelize";
import { Creature } from "./models/creature";
import Trait from "./models/trait";

export const getCreatures = async (query: any) => {
  const filters: any = {};

  if (query.level) {
    filters.level = Number(query.level);
  }
  if (query.creatureName) {
    filters.creatureName = {
      [Op.like]: `%${query.creatureName}%`,
    };
  }
  if (query.aligment) {
    filters.aligment = query.aligment;
  }

  return await Creature.findAll({
    include: ['traits']
  });;
};

export const getCreatureById = async (id: number) => {
  return await Creature.findByPk(id);
};

export const createCreature = async (data: any) => {
    const {traits, ...creatureData} = data;
    const creature = await Creature.create(creatureData);
    if (traits) {
      await Trait.bulkCreate(traits.map((name: string) => {
        return {
          name: name,
          creatureId: creature.id,
        }
      }));
    }
  return await Creature.findByPk(creature.id, {
    include: ["traits"]
  });
};

export const updateCreature = async (id: number, data: any) => {
  await Creature.update(data, { where: { id } });
  return await Creature.findByPk(id);
};

export const deleteCreature = async (id: number) => {
  return await Creature.destroy({ where: { id } });
};
