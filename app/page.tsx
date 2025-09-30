"use client";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosLink } from "react-icons/io";

export default function Home() {
	const [openTimeline, setOpenTimeline] = useState(true);

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
			<div className="flex gap-[7vw]">
				{/* Tasks */}
				<motion.div
					className="flex flex-col w-[30vw]"
					variants={columnVariants}
				>
					<h2 className="pixel-sport text-[6vh] leading-[6vh] mb-[1.75vh]">
						Today's Tasks
					</h2>
					<motion.div variants={listVariants}>
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
					</motion.div>
					<h2 className="pixel-sport text-[6vh] leading-[6vh] mb-[1.75vh] mt-[5vh]">
						Monthly Progression
					</h2>
					<div className="grid grid-cols-4 gap-y-[2vh] items-center justify-center">
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
					</div>
				</motion.div>

				{/* Goals */}
				<motion.div
					className="flex flex-col w-[55vw]"
					variants={columnVariants}
				>
					<h2 className="pixel-sport text-[6vh] leading-[6vh]">Your Goals</h2>
					<motion.div
						className="flex flex-col w-[50vw]"
						variants={listVariants}
					>
						{[1, 2].map((goal, i) => (
							<motion.div
								key={i}
								variants={listVariants}
								className="flex items-start border-b-[1px] border-neutral-500 text-start flex-col justify-start py-[2.5vh] pb-[3vh] gap-[0.5vh] relative"
							>
								{/* Goal Title */}
								<motion.h2
									variants={itemVariants}
									className="text-[2.5vh] text-start font-medium"
								>
									Handstand
								</motion.h2>

								{/* Dates */}
								<motion.div
									variants={itemVariants}
									className="flex items-center gap-[0.5vw] w-full mb-[0.5vh]"
								>
									<h3 className="bg-neutral-200 rounded-full text-[1.3vh] px-[1vw] py-[0.25vh]">
										Start date: <span className="font-medium">12/12/2023</span>
									</h3>
									{"-"}
									<h3 className="bg-neutral-200 rounded-full text-[1.3vh] px-[1vw] py-[0.25vh]">
										Goal end date:{" "}
										<span className="font-medium">12/12/2023</span>
									</h3>
								</motion.div>

								{/* Description */}
								<motion.p
									variants={itemVariants}
									className="font-extralight text-[2vh]"
								>
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Blanditiis animi ullam aliquam sequi hic inventore.
								</motion.p>

								{/* Only first goal has timeline */}
								{i === 0 && (
									<>
										<motion.button
											variants={itemVariants}
											onClick={() => setOpenTimeline(!openTimeline)}
											className="flex items-center gap-2 mt-[1vh] text-[2vh] font-medium cursor-pointer"
										>
											{openTimeline ? (
												<IoIosArrowDown />
											) : (
												<IoIosArrowForward />
											)}
											Timeline
										</motion.button>

										<AnimatePresence>
											{openTimeline && (
												<motion.div
													variants={listVariants}
													initial="hidden"
													animate="visible"
													exit="hidden"
													className="border-l-[1px] my-[1.5vh] border-neutral-500 ml-[3vw] w-[47vw]"
												>
													{["Checkpoint 1", "Checkpoint 2", "Checkpoint 3"].map(
														(cp, j) => (
															<motion.div
																key={j}
																variants={itemVariants}
																className={`pl-[1.75vw] ${
																	j !== 2
																		? "border-b-[1px] border-neutral-500"
																		: ""
																} w-full py-[3vh] relative`}
															>
																<h2 className="pixel-sport text-[4vh] leading-[3.5vh]">
																	{cp}
																</h2>
																<p className="bg-neutral-200 border-[1px] border-neutral-500 rounded-full text-[1.3vh] px-[0.75vw] py-[0.25vh] w-fit my-[1vh] absolute rotate-90 top-[40%] left-[-2.75vw] translate-y-[-50%] font-medium text-black">
																	12/12/2025
																</p>
																<p className="text-[1.75vh] font-extralight">
																	Lorem ipsum dolor sit amet consectetur
																	adipisicing elit. Fugiat, obcaecati.
																</p>
															</motion.div>
														)
													)}
												</motion.div>
											)}
										</AnimatePresence>
									</>
								)}

								{/* Links */}

								<div className="flex gap-[0.5vw] mt-[1vh]">
									<span className=" flex items-center justify-center gap-[0.5vw] rounded-full border-[1px] border-neutral-200 cursor-pointer px-[1vw] py-[0.25vh] text-[1.5vh] font-medium">
										<IoIosLink className="text-[2vh]" /> Some Link
									</span>
									<span className=" flex items-center justify-center gap-[0.5vw] rounded-full border-[1px] border-neutral-200 cursor-pointer px-[1vw] py-[0.25vh] text-[1.5vh] font-medium">
										<IoIosLink className="text-[2vh]" /> Some Link
									</span>
									<span className=" flex items-center justify-center gap-[0.5vw] rounded-full border-[1px] border-neutral-200 cursor-pointer px-[1vw] py-[0.25vh] text-[1.5vh] font-medium">
										<IoIosLink className="text-[2vh]" /> Some Link
									</span>
								</div>

								{/* Habits */}
								<motion.div
									variants={itemVariants}
									className="flex gap-[0.5vw] mt-[0.75vh]"
								>
									<span className="bg-green-200 rounded-full border-[1px] border-green-400 px-[1vw] py-[0.25vh] text-[1.5vh] font-medium">
										Workout
									</span>
									<span className="bg-yellow-200 rounded-full border-[1px] border-yellow-400 px-[1vw] py-[0.25vh] text-[1.5vh] font-medium">
										Stretch
									</span>
									<span className="bg-purple-200 rounded-full border-[1px] border-purple-400 px-[1vw] py-[0.25vh] text-[1.5vh] font-medium">
										Drink Water
									</span>
								</motion.div>
							</motion.div>
						))}
					</motion.div>
				</motion.div>
			</div>
		</motion.div>
	);
}
