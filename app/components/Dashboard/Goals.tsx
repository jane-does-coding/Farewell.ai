"use client";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosLink } from "react-icons/io";

const Goals = ({ userGoals, currentUser }: any) => {
	const [openTimelines, setOpenTimelines] = useState<{
		[key: number]: boolean;
	}>({});

	const colors = [
		{ bg: "bg-green-200", border: "border-green-400" },
		{ bg: "bg-yellow-200", border: "border-yellow-400" },
		{ bg: "bg-purple-200", border: "border-purple-400" },
		{ bg: "bg-blue-200", border: "border-blue-400" },
	];

	const toggleTimeline = (index: number) => {
		setOpenTimelines((prev) => ({ ...prev, [index]: !prev[index] }));
	};

	const columnVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
	};

	const listVariants = {
		hidden: {},
		visible: { transition: { staggerChildren: 0.2 } },
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
	};

	return (
		<div>
			<motion.div className="flex flex-col w-[55vw]" variants={columnVariants}>
				<h2 className="pixel-sport text-[6vh] leading-[6vh]">Your Goals</h2>

				{userGoals.length === 0 ? (
					<p className="text-gray-500 text-[2vh] mt-4">
						You don’t have any goals yet.
					</p>
				) : (
					<motion.div
						className="flex flex-col w-[55vw]"
						variants={listVariants}
					>
						{userGoals.map((goal: any, i: number) => (
							<motion.div
								key={i}
								variants={listVariants}
								className="flex flex-col items-start border-b-[1px] border-gray-300 py-[2.5vh] pb-[3vh] gap-[0.5vh] relative"
							>
								{/* Goal Title */}
								<motion.h2
									variants={itemVariants}
									className="text-[2.5vh] font-medium text-gray-900"
								>
									{goal.title}
								</motion.h2>

								{/* Dates */}
								<motion.div
									variants={itemVariants}
									className="flex items-center gap-[0.5vw] w-full mb-[0.5vh]"
								>
									<h3 className="bg-gray-200 rounded-full text-[1.3vh] px-[1vw] py-[0.25vh]">
										Start date:{" "}
										<span className="font-medium">
											{new Date(goal.startDate).toLocaleDateString()}
										</span>
									</h3>
									{"-"}
									<h3 className="bg-gray-200 rounded-full text-[1.3vh] px-[1vw] py-[0.25vh]">
										Goal end date:{" "}
										<span className="font-medium">
											{new Date(goal.endDate).toLocaleDateString()}
										</span>
									</h3>
								</motion.div>

								{/* Description */}
								<motion.p
									variants={itemVariants}
									className="font-extralight text-[2vh] text-gray-800"
								>
									{goal.description}
								</motion.p>

								{/* Timeline */}
								<>
									<motion.button
										variants={itemVariants}
										onClick={() => toggleTimeline(i)}
										className="flex items-center gap-2 mt-[1vh] text-[2vh] font-medium cursor-pointer text-gray-900"
									>
										{openTimelines[i] ? (
											<IoIosArrowDown />
										) : (
											<IoIosArrowForward />
										)}
										Timeline
									</motion.button>

									<AnimatePresence>
										{openTimelines[i] && (
											<motion.div
												variants={listVariants}
												initial="hidden"
												animate="visible"
												exit="hidden"
												className="border-l-[1px] my-[1.5vh] border-gray-300 ml-[3vw] w-[52vw]"
											>
												{goal.checkpoints.map((cp: any, j: number) => (
													<motion.div
														key={j}
														variants={itemVariants}
														className={`pl-[2.5vw] ${
															j !== goal.checkpoints.length - 1
																? "border-b-[1px] border-gray-300"
																: ""
														} w-full py-[3vh] relative`}
													>
														<h2 className="pixel-sport text-[4vh] leading-[3.5vh]">
															{cp.title}
														</h2>
														<p className="bg-gray-200 border border-gray-300 rounded-full text-[1.3vh] px-[0.75vw] py-[0.25vh] w-fit my-[1vh] absolute rotate-90 top-[40%] left-[-6.25%] translate-y-[-50%] font-medium text-gray-900">
															{cp.date
																? new Date(cp.date).toLocaleDateString()
																: "No date"}
														</p>
														<p className="text-[1.75vh] font-extralight text-gray-800">
															{cp.notes}
														</p>
													</motion.div>
												))}
											</motion.div>
										)}
									</AnimatePresence>
								</>

								{/* Links */}
								<div className="flex gap-[0.5vw] mt-[1vh] flex-wrap">
									{goal.links?.map((link: any, k: number) => (
										<a
											key={k}
											href={link.url}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center justify-center gap-[0.5vw] rounded-full border border-gray-300 px-[1vw] py-[0.25vh] text-[1.5vh] font-medium hover:bg-gray-100 transition text-gray-900"
										>
											<IoIosLink className="text-[2vh]" />
											{link.label || link.url}
										</a>
									))}
								</div>

								{/* Habits */}
								<div className="flex mt-[2vh] flex-wrap gap-2">
									{goal.habits.map((habit: any, h: number) => {
										const color = colors[h % colors.length];
										return (
											<span
												key={h}
												className={`${color.bg} ${color.border} rounded-full px-[1vw] py-[0.25vh] text-[1.5vh] font-medium`}
											>
												{habit.habit.name}
											</span>
										);
									})}
								</div>

								<div className="mt-[1vh]">
									<button
										className="text-red-600 font-bold"
										onClick={async () => {
											const res = await fetch("/api/goals/delete", {
												method: "POST",
												headers: { "Content-Type": "application/json" },
												body: JSON.stringify({ goalId: goal.id }),
											});
											if (res.ok) {
												const idx = userGoals.findIndex(
													(g: any) => g.id === goal.id
												);
												if (idx > -1) userGoals.splice(idx, 1);
												setOpenTimelines({ ...openTimelines });
											}
										}}
									>
										Delete Goal
									</button>
								</div>
							</motion.div>
						))}
					</motion.div>
				)}
			</motion.div>
		</div>
	);
};

export default Goals;
