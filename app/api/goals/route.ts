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
			select: { id: true },
		});

		if (!user)
			return NextResponse.json({ error: "User not found" }, { status: 404 });

		const goals = await prisma.goal.findMany({
			where: { userId: user.id },
			include: {
				checkpoints: true,
				links: true,
				habits: {
					include: {
						habit: true,
					},
				},
			},
			orderBy: { createdAt: "desc" },
		});

		return NextResponse.json(goals);
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ error: "Failed to fetch goals" },
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
		const {
			title,
			description,
			startDate,
			endDate,
			checkpoints,
			links,
			habits,
		} = body;

		const user = await prisma.user.findUnique({
			where: { email: session.user.email },
		});
		if (!user)
			return NextResponse.json({ error: "User not found" }, { status: 404 });

		const goal = await prisma.goal.create({
			data: {
				title,
				description: description || null,
				startDate: startDate ? new Date(startDate) : new Date(),
				endDate: endDate ? new Date(endDate) : new Date(),
				userId: user.id,
				checkpoints: {
					create:
						checkpoints?.map((c: any) => ({
							title: c.title || "",
							date: c.date ? new Date(c.date) : new Date(),
							notes: c.notes || null,
						})) ?? [],
				},
				links: {
					create:
						links?.map((l: any) => ({
							label: l.label || "",
							url: l.url || "",
						})) ?? [],
				},
			},
		});

		if (Array.isArray(habits) && habits.length > 0) {
			for (const h of habits) {
				if (h?.id) {
					try {
						await prisma.goalHabit.create({
							data: {
								goalId: goal.id,
								habitId: h.id,
							},
						});
					} catch (e) {
						console.warn("attach habit error", e);
					}
				} else if (h?.name) {
					const createdHabit = await prisma.habit.create({
						data: {
							name: h.name,
							userId: user.id,
						},
					});
					await prisma.goalHabit.create({
						data: {
							goalId: goal.id,
							habitId: createdHabit.id,
						},
					});
				}
			}
		}

		const created = await prisma.goal.findUnique({
			where: { id: goal.id },
			include: {
				checkpoints: true,
				links: true,
				habits: {
					include: {
						habit: true,
					},
				},
			},
		});

		return NextResponse.json(created);
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ error: "Failed to create goal" },
			{ status: 500 }
		);
	}
}
