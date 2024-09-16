import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import generateShortId from "ssid";

const urlSchema = z.object({
  url: z.string(),
});

const shortUrlSchema = z.object({
  shortUrl: z.string(),
});

export async function POST(req: NextRequest) {
  const { url } = await req.json();
  const shortUrl = generateShortId(6, false);

  try {
    const newUrl = urlSchema.parse({ url });

    const existingLink = await prismaClient.url.findUnique({
      where: {
        url: newUrl.url,
      },
      select: {
        id: true,
        url: true,
        shortUrl: true,
        createdAt: true,
        updatedAt: true,
        count: true,
      },
    });

    if (existingLink) {
      return NextResponse.json(existingLink);
    } else {
      try {
        const newShortUrl = shortUrlSchema.parse({ shortUrl });

        const newRow = await prismaClient.url.create({
          data: {
            url: newUrl.url,
            shortUrl: newShortUrl.shortUrl,
          },
        });

        return NextResponse.json(newRow, { status: 200 });
      } catch (f) {
        console.log(f);
        return NextResponse.json(f, { status: 412 });
      }
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json(e, { status: 411 });
  }
}
