import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(req: Request) {
	try {
		const { goalId } = await req.json();
		if (!goalId)
			return NextResponse.json({ error: "Missing goalId" }, { status: 400 });

		await prisma.goal.delete({ where: { id: goalId } });
		return NextResponse.json({ success: true });
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ error: "Failed to delete goal" },
			{ status: 500 }
		);
	}
}
