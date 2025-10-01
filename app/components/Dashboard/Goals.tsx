"use client";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosLink } from "react-icons/io";

const Goals = ({ userGoals, currentUser }: any) => {
	const [openTimeline, setOpenTimeline] = useState(true);

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
		<div>
			{/* Goals */}
			<motion.div className="flex flex-col w-[55vw]" variants={columnVariants}>
				<h2 className="pixel-sport text-[6vh] leading-[6vh]">Your Goals</h2>
				<motion.div className="flex flex-col w-[50vw]" variants={listVariants}>
					{userGoals.map((goal: any, i: number) => (
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
								{goal.title}
							</motion.h2>

							{/* Dates */}
							<motion.div
								variants={itemVariants}
								className="flex items-center gap-[0.5vw] w-full mb-[0.5vh]"
							>
								<h3 className="bg-neutral-200 rounded-full text-[1.3vh] px-[1vw] py-[0.25vh]">
									Start date:{" "}
									<span className="font-medium">
										{new Date(goal.startDate).toLocaleDateString()}
									</span>
								</h3>
								{"-"}
								<h3 className="bg-neutral-200 rounded-full text-[1.3vh] px-[1vw] py-[0.25vh]">
									Goal end date:{" "}
									<span className="font-medium">
										{new Date(goal.endDate).toLocaleDateString()}
									</span>
								</h3>
							</motion.div>

							{/* Description */}
							<motion.p
								variants={itemVariants}
								className="font-extralight text-[2vh]"
							>
								{goal.description}
							</motion.p>

							{/* Only first goal has timeline */}
							<>
								<motion.button
									variants={itemVariants}
									onClick={() => setOpenTimeline(!openTimeline)}
									className="flex items-center gap-2 mt-[1vh] text-[2vh] font-medium cursor-pointer"
								>
									{openTimeline ? <IoIosArrowDown /> : <IoIosArrowForward />}
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
											{goal.checkpoints.map((cp: any, j: any) => (
												<motion.div
													key={j}
													variants={itemVariants}
													className={`pl-[2.5vw] ${
														j !== 2 ? "border-b-[1px] border-neutral-500" : ""
													} w-full py-[3vh] relative`}
												>
													<h2 className="pixel-sport text-[4vh] leading-[3.5vh]">
														{cp.title}
													</h2>
													<p className="bg-neutral-200 border-[1px] border-neutral-500 rounded-full text-[1.3vh] px-[0.75vw] py-[0.25vh] w-fit my-[1vh] absolute rotate-90 top-[40%] left-[-6.25%] translate-y-[-50%] font-medium text-black">
														{cp.date
															? new Date(cp.date).toLocaleDateString()
															: "No date"}
													</p>
													<p className="text-[1.75vh] font-extralight">
														{cp.notes}
													</p>
												</motion.div>
											))}
										</motion.div>
									)}
								</AnimatePresence>
							</>

							<div className="flex gap-[0.5vw] mt-[1vh] flex-wrap">
								{goal.links?.length > 0 &&
									goal.links.map((link: any, k: number) => (
										<a
											key={k}
											href={link.url}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center justify-center gap-[0.5vw] rounded-full border-[1px] border-neutral-200 cursor-pointer px-[1vw] py-[0.25vh] text-[1.5vh] font-medium hover:bg-neutral-100 transition"
										>
											<IoIosLink className="text-[2vh]" />
											{link.label || link.url}
										</a>
									))}
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
	);
};

export default Goals;
