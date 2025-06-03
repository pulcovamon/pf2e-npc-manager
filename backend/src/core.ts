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

  if (traits && Array.isArray(traits)) {
    await Trait.bulkCreate(
      traits.map((trait: string) => ({
        name: trait,
        creatureId: creature.id,
      }))
    );
  }

  return await Creature.findByPk(creature.id, {
    include: [{ model: Trait, as: "traits" }],
  });
}

export async function updateCreature(id: number, data: any) {
  const { traits, ...creatureData } = data;

  await Creature.update(creatureData, { where: { id } });

  if (Array.isArray(traits)) {
    await Trait.destroy({ where: { creatureId: id } });

    await Trait.bulkCreate(
      traits.map((name: string) => ({
        name,
        creatureId: id,
      }))
    );
  }

  return await Creature.findByPk(id, { include: ["traits"] });
}


export async function deleteCreature(id: number) {
  return await Creature.destroy({ where: { id } });
}

export async function bulkCreateCreatures(creatures: any[]) {
  const createdCreatures = [];

  for (const c of creatures) {
    const { traits, ...creatureData } = c;
    const creature = await Creature.create(creatureData);

    if (traits && traits.length > 0) {
      await Trait.bulkCreate(
        traits.map((traitName: string) => ({
          name: traitName,
          creatureId: creature.id,
        }))
      );
    }

    const fullCreature = await Creature.findByPk(creature.id, {
      include: ["traits"],
    });

    createdCreatures.push(fullCreature);
  }

  return createdCreatures;
}
