import { create } from "domain";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "../../../../lib/prisma";
import { createIssueSchema } from "../../validationSchemas";


export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(z.treeifyError(validation.error), { status: 400 });
  }
  const newIssue = await prisma.issue.create({
    data: {
      title: validation.data.title,
      description: validation.data.description,
    }
  })
  return NextResponse.json(newIssue, { status: 201 });

}