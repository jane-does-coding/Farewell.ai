import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
	const session = await getServerSession();
	if (!session?.user?.email) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const { habitId } = await req.json();
		if (!habitId)
			return NextResponse.json({ error: "Missing habitId" }, { status: 400 });

		const today = new Date();
		today.setHours(0, 0, 0, 0);

		// Try to find an existing progression entry for today
		let progress = await prisma.habitProgression.findFirst({
			where: { habitId, date: today },
		});

		if (progress) {
			progress = await prisma.habitProgression.update({
				where: { id: progress.id },
				data: { done: !progress.done },
			});
		} else {
			progress = await prisma.habitProgression.create({
				data: { habitId, date: today, done: true, value: 1 },
			});
		}

		return NextResponse.json(progress);
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ error: "Failed to toggle progress" },
			{ status: 500 }
		);
	}
}
