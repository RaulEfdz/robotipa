import { createClient } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { section } = req.body;
    const user_agent = req.headers["user-agent"] || "";
    const ip_address =
      req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "";

    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_KEY!
    );

    await supabase
      .from("page_visits")
      .insert([{ section, user_agent, ip_address }]);

    res.status(200).json({ success: true });
  } else {
    res.status(405).end();
  }
}
