import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
	const session = await getServerSession();
	if (!session?.user?.email) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const body = await req.json();
	const { name } = body;

	try {
		const user = await prisma.user.findUnique({
			where: { email: session.user.email },
		});

		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		const habit = await prisma.habit.create({
			data: {
				name,
				userId: user.id,
			},
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
