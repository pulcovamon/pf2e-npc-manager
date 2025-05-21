import { Creature } from './creature';
import { Trait } from './trait';

Creature.hasMany(Trait, { foreignKey: 'creatureId', as: 'traits' });
Trait.belongsTo(Creature, { foreignKey: 'creatureId', as: 'creature' });