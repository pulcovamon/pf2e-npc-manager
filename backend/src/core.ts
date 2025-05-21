import { Op } from "sequelize";
import { Creature } from "./models/creature";
import Trait from "./models/trait";

export async function getCreatures(query: any) {
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
  if (query.creatureFamily) {
    filters.creatureFamily = {
      [Op.like]: `%${query.creatureFamily}%`,
    };
  }

  return await Creature.findAll({
    where: filters,
    include: ["traits"],
  });
}

export async function getCreatureById(id: number) {
  return await Creature.findByPk(id, { include: ["traits"] });
}

export async function createCreature(data: any) {
  const { traits, ...creatureData } = data;
  const creature = await Creature.create(creatureData);
  if (traits) {
    await Trait.bulkCreate(
      traits.map((t: { name: string }) => ({
        name: t.name,
        creatureId: creature.id,
      }))
    );
  }
  return await Creature.findByPk(creature.id, {
    include: ["traits"],
  });
}

export async function updateCreature(id: number, data: any) {
  await Creature.update(data, { where: { id } });
  return await Creature.findByPk(id, { include: ["traits"] });
}

export async function deleteCreature(id: number) {
  return await Creature.destroy({ where: { id } });
}

export async function bulkCreateCreatures(creatures: any[]) {
  return await Creature.bulkCreate(creatures, { validate: true });
}
