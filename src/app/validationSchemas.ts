import { z } from "zod";

export const createIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title must be less than 255 characters"),
  description: z.string().min(1, "Description is required").max(1000, "Description must be less than 1000 characters"),
});
