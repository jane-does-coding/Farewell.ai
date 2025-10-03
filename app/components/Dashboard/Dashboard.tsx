"use client";
import { motion } from "framer-motion";
import Goals from "./Goals";
import TodaysTasks from "./TodaysTasks";
import MonthlyProgression from "./MonthlyProgression";
import Link from "next/link";

export default function Dashboard({ currentUser, userGoals }: any) {
	const pageVariants = {
		hidden: {},
		visible: {
			transition: { staggerChildren: 0.5 },
		},
	};

	const columnVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5 },
		},
	};

	return (
		<motion.div
			className="px-[5vw] pb-[5vh]"
			variants={pageVariants}
			initial="hidden"
			animate="visible"
		>
			<h2 className="pixel-sport text-[10vh] leading-[10vh] mt-[3vh]">
				Your Dashboard
			</h2>
			<Link href={"/create"} className=" text-[2vh] text-blue-800">
				Create +
			</Link>

			<div className="flex gap-[7vw] mt-[5vh]">
				<motion.div
					className="flex flex-col w-[30vw]"
					variants={columnVariants}
				>
					<TodaysTasks />

					<MonthlyProgression />
				</motion.div>

				<Goals userGoals={userGoals} currentUser={currentUser} />
			</div>
		</motion.div>
	);
}
