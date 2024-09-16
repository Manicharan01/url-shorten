import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const shortUrlSchema = z.object({
  shortUrl: z.string(),
});

export async function DELETE(req: NextRequest) {
  const { shortUrl } = await req.json();

  try {
    const newShortUrl = shortUrlSchema.parse({ shortUrl });

    await prismaClient.url.delete({
      where: {
        shortUrl: newShortUrl.shortUrl,
      },
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(e, { status: 411 });
  }
}
