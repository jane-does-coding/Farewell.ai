import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { getServerSession } from "next-auth";

export async function GET() {
	const session = await getServerSession();
	if (!session?.user?.email) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const user = await prisma.user.findUnique({
			where: { email: session.user.email },
			include: { habits: true },
		});

		if (!user)
			return NextResponse.json({ error: "User not found" }, { status: 404 });

		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const habitsWithProgress = await Promise.all(
			user.habits.map(async (h: any) => {
				const progress = await prisma.habitProgression.findFirst({
					where: { habitId: h.id, date: today },
				});
				return { id: h.id, name: h.name, doneToday: !!progress?.done };
			})
		);

		return NextResponse.json(habitsWithProgress);
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ error: "Failed to fetch habits" },
			{ status: 500 }
		);
	}
}

export async function POST(req: Request) {
	const session = await getServerSession();
	if (!session?.user?.email) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const body = await req.json();
		const { name } = body;
		if (!name)
			return NextResponse.json(
				{ error: "Missing habit name" },
				{ status: 400 }
			);

		const user = await prisma.user.findUnique({
			where: { email: session.user.email },
		});
		if (!user)
			return NextResponse.json({ error: "User not found" }, { status: 404 });

		const habit = await prisma.habit.create({
			data: { name, userId: user.id },
		});

		return NextResponse.json(habit);
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ error: "Failed to create habit" },
			{ status: 500 }
		);
	}
}
