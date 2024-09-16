import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const urlSchema = z.object({
  shortUrl: z.string(),
  newUrl: z.string(),
});

export async function PUT(req: NextRequest) {
  const { shortUrl, newUrl } = await req.json();

  try {
    const newUrls = urlSchema.parse({ shortUrl, newUrl });

    try {
      await prismaClient.url.update({
        where: {
          shortUrl: newUrls.shortUrl,
        },
        data: {
          url: newUrls.newUrl,
        },
      });

      return NextResponse.json({ message: "Success" }, { status: 200 });
    } catch (f) {
      console.log(f);
      return NextResponse.json(f, { status: 411 });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json(e, { status: 411 });
  }
}
