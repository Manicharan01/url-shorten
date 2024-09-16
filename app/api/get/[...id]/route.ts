import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id;

  try {
    const requestedUrl = await prismaClient.url.findUnique({
      where: {
        id: id[0],
      },
      select: {
        shortUrl: true,
      },
    });

    return NextResponse.json(requestedUrl);
  } catch (e) {
    console.log(e);
    return NextResponse.json(e, { status: 411 });
  }
}
