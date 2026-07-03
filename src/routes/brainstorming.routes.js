const express = require("express");
const BrainstormingRoutes = express.Router();
const BrainstormingController = require("../controllers/brainstorming.controller");

BrainstormingRoutes.post(
  "/brainstorming/create",
  BrainstormingController.createBrainstorming,
);

BrainstormingRoutes.get(
  "/brainstorming/countAllBrainstormings",
  BrainstormingController.getAllBrainstormingsAndCount,
);

BrainstormingRoutes.get(
  "/brainstorming/getAllUserBrainstormingsGrid/:id",
  BrainstormingController.getAllUserBrainstormingsGrid,
);

BrainstormingRoutes.get(
  "/brainstorming/getAllUserBrainstormingsList/:id",
  BrainstormingController.getAllUserBrainstormingsList,
);

BrainstormingRoutes.patch(
  "/brainstorming/:brainstormingId/status",
  BrainstormingController.updateBrainstormingStatus,
);

BrainstormingRoutes.delete(
  "/brainstorming/:brainstormingId",
  BrainstormingController.deleteBrainstorming,
);

BrainstormingRoutes.get(
  "/brainstorming/statusHelp",
  BrainstormingController.helpBrainstormingStatus,
);

BrainstormingRoutes.post(
  "/brainstorming/assign-role",
  BrainstormingController.assignRole,
);

BrainstormingRoutes.patch(
  "/brainstorming/:brainstormingId/checklist",
  BrainstormingController.updateBrainstormingChecklist,
);

BrainstormingRoutes.post(
  "/brainstorming/start/:brainstormingId",
  BrainstormingController.startBrainstormingSession,
);

BrainstormingRoutes.get(
  "/brainstorming/:brainstormingId",
  BrainstormingController.getBrainstorming,
);

BrainstormingRoutes.post(
  "/brainstorming/:brainstormingId/user-stories/:userStoryId/cards/:cardCode/notes",
  BrainstormingController.createNote,
);

BrainstormingRoutes.put(
  "/brainstorming/:brainstormingId/user-stories/:userStoryId/cards/:cardCode/notes",
  BrainstormingController.updateNote,
);

BrainstormingRoutes.get(
  "/brainstorming/:brainstormingId/user-stories/:userStoryId/cards/:cardCode/notes",
  BrainstormingController.getNote,
);

BrainstormingRoutes.patch(
  "/brainstorming/:brainstormingId/user-stories-order",
  BrainstormingController.updateBrainstormingUserStoryOrder,
);

BrainstormingRoutes.put(
  "/brainstorming/:id",
  BrainstormingController.updateBrainstorming,
);

BrainstormingRoutes.get(
  "/brainstorming/:brainstormingId/export",
  BrainstormingController.exportBrainstormingResults,
);

module.exports = BrainstormingRoutes;
