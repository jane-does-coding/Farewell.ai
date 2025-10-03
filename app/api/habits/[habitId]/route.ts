import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface Params {
	params: { habitId: string };
}

export async function DELETE(req: Request, { params }: Params) {
	const { habitId } = params;

	if (!habitId) {
		return NextResponse.json({ error: "Missing habitId" }, { status: 400 });
	}

	try {
		await prisma.habitProgression.deleteMany({
			where: { habitId },
		});

		await prisma.habit.delete({
			where: { id: habitId },
		});

		return NextResponse.json({ success: true });
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ error: "Failed to delete habit" },
			{ status: 500 }
		);
	}
}
