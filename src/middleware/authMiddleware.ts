import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || "";

declare module 'next/server' {
  interface NextRequest {
    user?: any;
  }
}

export const authMiddleware = (
  handler: (req: NextRequest, context: { params: { id: string } }) => Promise<NextResponse>
) => {
  return async (req: NextRequest) => {
    const token = req.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ message: "No token provided" }, { status: 401 });
    }

    try {
      let data = jwt.verify(token, SECRET_KEY);

      let payload = data;

      if (typeof data === 'object' && data !== null && '_doc' in data) {
        req.user = (data as JwtPayload)._doc;
      } else {
        req.user = data;
      }

      const url = new URL(req.url);
      const id = url.pathname.split('/').pop() || ''; 
      const context = { params: { id } };
      return handler(req, context);
    } catch (error) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
  };
};
