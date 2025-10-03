import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { getServerSession } from "next-auth";

export async function GET() {
	const session = await getServerSession();
	if (!session?.user?.email) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const startOfMonth = new Date();
	startOfMonth.setDate(1);
	startOfMonth.setHours(0, 0, 0, 0);

	const habits = await prisma.habit.findMany({
		where: { user: { email: session.user.email } },
		include: {
			progression: {
				where: { date: { gte: startOfMonth } },
				orderBy: { date: "asc" },
			},
		},
	});

	return NextResponse.json(habits);
}
