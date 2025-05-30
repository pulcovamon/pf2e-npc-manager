import { Router, Request, Response } from "express";
import {
  getCreatures,
  getCreatureById,
  createCreature,
  updateCreature,
  deleteCreature,
  bulkCreateCreatures
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
      console.error(error);
      res.status(500).json({ error });
    }
  });

router
  .route("/creature/:id")
  .get(async (req: Request, res: Response): Promise<void> => {
    const creature = await getCreatureById(Number(req.params.id));
    if (!creature) {
      res.status(404).json({ message: "Not found" });
      return;
    }
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

  router.post("/creature/bulk", async (req: Request, res: Response) => {
    try {
      const inserted = await bulkCreateCreatures(req.body);
      res.status(201).json({ created: inserted.length });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Bulk insert failed" });
    }
  });

export default router;
