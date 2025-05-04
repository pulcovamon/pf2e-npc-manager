import { Router, Request, Response } from "express";
import {
  getCreatures,
  getCreatureById,
  createCreature,
  updateCreature,
  deleteCreature,
} from "./core";

const router = Router();

router
  .route("/creature")
  .get(async (req: Request, res: Response) => {
    try {
      const creatures = await getCreatures(req.query);
      res.json(creatures);
    } catch (error) {
      res.status(500).json({ error });
    }
  })
  .post(async (req: Request, res: Response) => {
    try {
      const newCreature = await createCreature(req.body);
      res.status(201).json(newCreature);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

router
  .route("/task/:id(\\d+)")
  .get(async (req: Request, res: Response) => {
    const creature = await getCreatureById(Number(req.params.id));
    if (!creature) return res.status(404).json({ message: "Not found" });
    res.json(creature);
  })
  .put(async (req: Request, res: Response) => {
    try {
      const updated = await updateCreature(Number(req.params.id), req.body);
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error });
    }
  })
  .delete(async (req: Request, res: Response) => {
    try {
      await deleteCreature(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error });
    }
  });

export default router;
