import { getServerSession } from "next-auth/next";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getUserGoals() {
	try {
		console.log("getting user goals");
		const currentUser = await getCurrentUser();

		if (!currentUser) {
			console.log("no user??");
			return null;
		}
		console.log("getting user goals2");

		const userGoals = await prisma.goal.findMany({
			where: {
				userId: currentUser.id as string,
			},
			include: {
				links: true,
			},
		});

		console.log("Cant get them?");
		console.log("goals:" + userGoals);
		console.log(userGoals);

		if (!userGoals) {
			return null;
		}

		return userGoals;
	} catch (err: any) {
		return null;
	}
}
