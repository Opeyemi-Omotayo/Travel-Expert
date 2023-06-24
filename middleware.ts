import { NextRequest, NextResponse } from "next/server";
import React from "react";
import * as jose from "jose";

const middleware = async (req: NextRequest, res: NextResponse) => {
  const bearerToken = req.headers.get("authorization") as String;

  if (!bearerToken) {
    return new NextResponse(JSON.stringify({ errorMessage: "Unauthorized!" }), {
      status: 401,
    });
  }

  const token = bearerToken.split(" ")[1];

  if (!token) {
    return new NextResponse(JSON.stringify({ errorMessage: "Unauthorized!" }), {
      status: 401,
    });
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    await jose.jwtVerify(token, secret);
  } catch (error) {
    return new NextResponse(JSON.stringify({ errorMessage: "Unauthorized!" }), {
      status: 401,
    });
  }
};

export const config = {
  matcher: ["/api/auth/me"],
};

export default middleware;
