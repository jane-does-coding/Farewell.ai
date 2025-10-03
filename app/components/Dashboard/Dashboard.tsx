"use client";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosLink } from "react-icons/io";
import Goals from "./Goals";
import TodaysTasks from "./TodaysTasks";
import MonthlyProgression from "./MonthlyProgression";

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

	const listVariants = {
		hidden: {},
		visible: {
			transition: { staggerChildren: 0.2 },
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
	};

	return (
		<motion.div
			className="px-[5vw]"
			variants={pageVariants}
			initial="hidden"
			animate="visible"
		>
			<h2 className="pixel-sport text-[10vh] mb-[2vh]">Your Dashboard</h2>
			{/* 			<h2 className="text-[3vh] mb-[2vh]">{currentUser.email}</h2>
			 */}{" "}
			<div className="flex gap-[7vw]">
				{/* Tasks */}
				<motion.div
					className="flex flex-col w-[30vw]"
					variants={columnVariants}
				>
					<TodaysTasks />
					{/* <motion.div variants={listVariants}>
						{[
							{ text: "Drink more water", done: false },
							{ text: "Wake up at 7am", done: false },
							{ text: "Workout", done: true },
							{ text: "Meditate", done: false },
						].map((habit, i) => (
							<motion.div
								key={i}
								variants={itemVariants}
								className="flex items-center justify-between relative py-[0.5vh]"
							>
								<h2 className="text-[2.25vh]">{habit.text}</h2>
								<span
									className={`h-[2vh] w-[2vh] rounded-[0.1vh] cursor-pointer border-black border-[2px] ${
										habit.done ? "bg-neutral-700" : ""
									}`}
								></span>
							</motion.div>
						))}
					</motion.div> */}
					{/* 	<h2 className="pixel-sport text-[6vh] leading-[6vh] mb-[1.75vh] mt-[5vh]">
						Monthly Progression
					</h2> */}
					{/* <div className="grid grid-cols-4 gap-y-[2vh] items-center justify-center">
						<div className="flex flex-col items-center justify-center">
							<h2 className="mb-[1vh] text-[2vh] font-extralight">Habit 1</h2>
							<div className="h-[300px] bg-neutral-100 rounded-[0.5vh] overflow-hidden border-[1px] border-neutral-300 w-[25px] flex flex-col items-center justify-end">
								<div className="bg-blue-300 w-full h-[30px]"></div>
								<div className="bg-black w-full h-[10px]"></div>
								<div className="bg-blue-300 w-full h-[10px]"></div>
								<div className="bg-black w-full h-[10px]"></div>
								<div className="bg-blue-300 w-full h-[70px]"></div>
								<div className="bg-black w-full h-[20px]"></div>
								<div className="bg-blue-300 w-full h-[50px]"></div>
								<div className="bg-black w-full h-[10px]"></div>
								<div className="bg-blue-300 w-full h-[30px]"></div>
							</div>
						</div>
						<div className="flex flex-col items-center justify-center">
							<h2 className="mb-[1vh] text-[2vh] font-extralight">Habit 1</h2>
							<div className="h-[300px] bg-neutral-100 rounded-[0.5vh] overflow-hidden border-[1px] border-neutral-300 w-[25px] flex flex-col items-center justify-end">
								<div className="bg-blue-300 w-full h-[30px]"></div>
								<div className="bg-black w-full h-[10px]"></div>
								<div className="bg-blue-300 w-full h-[10px]"></div>
								<div className="bg-black w-full h-[10px]"></div>
								<div className="bg-blue-300 w-full h-[70px]"></div>
								<div className="bg-black w-full h-[20px]"></div>
								<div className="bg-blue-300 w-full h-[50px]"></div>
								<div className="bg-black w-full h-[10px]"></div>
								<div className="bg-blue-300 w-full h-[30px]"></div>
							</div>
						</div>
						<div className="flex flex-col items-center justify-center">
							<h2 className="mb-[1vh] text-[2vh] font-extralight">Habit 1</h2>
							<div className="h-[300px] bg-neutral-100 rounded-[0.5vh] overflow-hidden border-[1px] border-neutral-300 w-[25px] flex flex-col items-center justify-end">
								<div className="bg-blue-300 w-full h-[30px]"></div>
								<div className="bg-black w-full h-[10px]"></div>
								<div className="bg-blue-300 w-full h-[10px]"></div>
								<div className="bg-black w-full h-[10px]"></div>
								<div className="bg-blue-300 w-full h-[70px]"></div>
								<div className="bg-black w-full h-[20px]"></div>
								<div className="bg-blue-300 w-full h-[50px]"></div>
								<div className="bg-black w-full h-[10px]"></div>
								<div className="bg-blue-300 w-full h-[30px]"></div>
							</div>
						</div>
						<div className="flex flex-col items-center justify-center">
							<h2 className="mb-[1vh] text-[2vh] font-extralight">Habit 1</h2>
							<div className="h-[300px] bg-neutral-100 rounded-[0.5vh] overflow-hidden border-[1px] border-neutral-300 w-[25px] flex flex-col items-center justify-end">
								<div className="bg-blue-300 w-full h-[30px]"></div>
								<div className="bg-black w-full h-[10px]"></div>
								<div className="bg-blue-300 w-full h-[10px]"></div>
								<div className="bg-black w-full h-[10px]"></div>
								<div className="bg-blue-300 w-full h-[70px]"></div>
								<div className="bg-black w-full h-[20px]"></div>
								<div className="bg-blue-300 w-full h-[50px]"></div>
								<div className="bg-black w-full h-[10px]"></div>
								<div className="bg-blue-300 w-full h-[30px]"></div>
							</div>
						</div>
						<div className="flex flex-col items-center justify-center">
							<h2 className="mb-[1vh] text-[2vh] font-extralight">Habit 1</h2>
							<div className="h-[300px] bg-neutral-100 rounded-[0.5vh] overflow-hidden border-[1px] border-neutral-300 w-[25px] flex flex-col items-center justify-end">
								<div className="bg-blue-300 w-full h-[30px]"></div>
								<div className="bg-black w-full h-[10px]"></div>
								<div className="bg-blue-300 w-full h-[10px]"></div>
								<div className="bg-black w-full h-[10px]"></div>
								<div className="bg-blue-300 w-full h-[70px]"></div>
								<div className="bg-black w-full h-[20px]"></div>
								<div className="bg-blue-300 w-full h-[50px]"></div>
								<div className="bg-black w-full h-[10px]"></div>
								<div className="bg-blue-300 w-full h-[30px]"></div>
							</div>
						</div>
					</div> */}
					<MonthlyProgression />
				</motion.div>

				<Goals userGoals={userGoals} currentUser={currentUser} />
			</div>
		</motion.div>
	);
}
