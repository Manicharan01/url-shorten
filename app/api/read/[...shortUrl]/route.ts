import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { shortUrl: string } },
) {
  const shortUrl = params.shortUrl;
  console.log(shortUrl);

  try {
    const url = await prismaClient.url.findUnique({
      where: {
        shortUrl: shortUrl[0],
      },
      select: {
        url: true,
        count: true,
      },
    });

    await prismaClient.url.update({
      where: {
        shortUrl: shortUrl[0],
      },
      data: {
        count: (url?.count ?? 0) + 1,
      },
    });

    return NextResponse.json(url);
  } catch (e) {
    console.log(e);
    return NextResponse.json(e);
  }
}
