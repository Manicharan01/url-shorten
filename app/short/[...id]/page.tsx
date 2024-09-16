"use client";

import { URL } from "@/store/atoms/url";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Component() {
  const router = useRouter();
  const { id } = useParams();
  const [urlDetails, setUrlDetails] = useState<URL>();

  async function getUrlDetails() {
    const res = await fetch(`http://localhost:3000/api/get/${id}`);
    const json = await res.json();
    setUrlDetails(json);
  }

  useEffect(() => {
    getUrlDetails();
  }, []);

  console.log(urlDetails?.shortUrl);

  return (
    <div className="flex flex-col items-center justify-center pt-16">
      <Card className="w-[450px] flex flex-col justify-center items-center bg-primary">
        <CardHeader>
          <CardTitle className="text-secondary">Shortend URL</CardTitle>
          <CardDescription>Use this to navigate to main URL</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="text"
              value={`http://localhost:3000/${urlDetails?.shortUrl}`}
              className="text-secondary"
            />
            <Button variant="secondary" type="submit">
              Copy
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="secondary"
            className="m-2"
            onClick={() => {
              router.push("www.google.co.in");
            }}
          >
            Update
          </Button>
          <Button variant="destructive" className="m-2">
            Delete
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
