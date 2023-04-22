import { NextApiRequest, NextApiResponse } from "next";
import React from "react";
import * as jose from "jose";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const me = async (req: NextApiRequest, res: NextApiResponse) => {
  
    const bearerToken = req.headers["authorization"] as String;


    const token = bearerToken.split(" ")[1];
  const payload = jwt.decode(token) as { email: string };

  if (!payload.email) {
    return res.status(401).json({ errorMessage: "Unauthorized!" });
  }

const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
    select: {
        id:true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        city: true
    }
  });

  if(!user){
    return res.status(401).json({
      errorMessage: "User not found!"
    })
  }

    return res.json({
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      phone: user.phone,
      city: user.city
    })
};

export default me;
