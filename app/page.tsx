"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [url, setUrl] = useState("");

  return (
    <div className="flex flex-col items-center justify-center pt-16">
      <Card className="w-[400px] flex flex-col justify-center items-center bg-primary">
        <CardHeader>
          <CardTitle className="text-secondary">New URL</CardTitle>
          <CardDescription>Add the URL to Shorten</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            placeholder="URL"
            className="text-secondary"
          />
        </CardContent>
        <CardFooter>
          <Button
            variant="secondary"
            onClick={async () => {
              await fetch(`http://localhost:3000/api/create`, {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify({
                  url: url,
                }),
              }).then((res) => {
                res.json().then((data) => {
                  console.log(data);
                  alert(data.message);
                  router.push("/short");
                });
              });
            }}
          >
            Shorten
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
