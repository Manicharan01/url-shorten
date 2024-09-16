import { prismaClient } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: { shortUrl: string } }) {
  const shortUrl = params.shortUrl;

  try {
    const url = await prismaClient.url.findUnique({
      where: {
        shortUrl,
      },
      select: {
        url: true,
      },
    });

    return NextResponse.json(url);
  } catch (e) {
    console.log(e);
    return NextResponse.json(e);
  }
}
