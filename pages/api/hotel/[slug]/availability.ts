import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { slug, day, time, sizes } = req.query as {
      slug: string;
      day: string;
      time: string;
      sizes: string;
    };

    if (!day || !time || !sizes) {
      return res.status(400).json({
        errorMessage: "Invalid data provided",
      });
    }

    

    return res.json({ slug, day, time, sizes });
  }
}

