import { Router } from "express";
import postsRouter from "./post.router";

const router = Router();
router.use("/post", postsRouter);

export default router;
