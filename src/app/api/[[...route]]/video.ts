// External Dependencies
import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
// import { getAuth } from '@hono/clerk-auth';

// Relative Dependencies
import { db } from "~/server/db";
import { eq } from "drizzle-orm";

const app = new Hono().post();

export default app;
