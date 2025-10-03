"use client";
import { useEffect, useState } from "react";

export default function MonthlyProgression() {
	const [habits, setHabits] = useState<any[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch("/api/habits/monthly");
			if (res.ok) {
				const data = await res.json();
				setHabits(data);
			}
		};
		fetchData();
	}, []);

	return (
		<div>
			<h2 className="pixel-sport text-[6vh] leading-[6vh] mb-[1.75vh] mt-[5vh]">
				Monthly Progression
			</h2>
			<div className="grid grid-cols-4 gap-y-[2vh] items-center justify-center">
				{habits.map((habit, idx) => (
					<div key={idx} className="flex flex-col items-center justify-center">
						<h2 className="mb-[1vh] text-[2vh] font-extralight">
							{habit.name}
						</h2>
						<div className="h-[300px] bg-neutral-100 rounded-[0.5vh] overflow-hidden border-[1px] border-neutral-300 w-[25px] flex flex-col items-center justify-end">
							{habit.progression.map((day: any, i: number) => (
								<div
									key={i}
									className={`w-full ${day.done ? "bg-blue-300" : "bg-black"}`}
									style={{ height: "10px" }}
								></div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
