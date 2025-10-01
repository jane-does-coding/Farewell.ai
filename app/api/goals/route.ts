import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
	const session = await getServerSession();
	if (!session?.user?.email) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const body = await req.json();
	const { title, description, startDate, endDate, checkpoints, links } = body;

	try {
		const user = await prisma.user.findUnique({
			where: { email: session.user.email },
		});

		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		const goal = await prisma.goal.create({
			data: {
				title,
				description,
				startDate: new Date(startDate),
				endDate: new Date(endDate),
				userId: user.id,
				checkpoints: {
					create: checkpoints?.map((c: any) => ({
						title: c.title,
						date: new Date(c.date),
						notes: c.notes || null,
					})),
				},
				links: {
					create: links?.map((l: any) => ({
						label: l.label,
						url: l.url,
					})),
				},
			},
			include: { checkpoints: true, links: true },
		});

		return NextResponse.json(goal);
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ error: "Failed to create goal" },
			{ status: 500 }
		);
	}
}
