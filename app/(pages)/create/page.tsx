"use client";

import { useState } from "react";

export default function CreatePage() {
	const [goal, setGoal] = useState({
		title: "",
		description: "",
		startDate: "",
		endDate: "",
	});
	const [habit, setHabit] = useState({ name: "" });

	const createGoal = async () => {
		await fetch("/api/goals", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(goal),
		});
		alert("Goal created!");
	};

	const createHabit = async () => {
		await fetch("/api/habits", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(habit),
		});
		alert("Habit created!");
	};

	return (
		<div className="p-10 space-y-10">
			<h1 className="text-3xl font-bold">Create Goals & Habits</h1>

			{/* Goal Form */}
			<div className="border p-6 rounded-lg space-y-3">
				<h2 className="text-xl font-semibold">Add Goal</h2>
				<input
					type="text"
					placeholder="Title"
					className="border p-2 w-full"
					value={goal.title}
					onChange={(e) => setGoal({ ...goal, title: e.target.value })}
				/>
				<textarea
					placeholder="Description"
					className="border p-2 w-full"
					value={goal.description}
					onChange={(e) => setGoal({ ...goal, description: e.target.value })}
				/>
				<div className="flex gap-4">
					<input
						type="date"
						className="border p-2"
						value={goal.startDate}
						onChange={(e) => setGoal({ ...goal, startDate: e.target.value })}
					/>
					<input
						type="date"
						className="border p-2"
						value={goal.endDate}
						onChange={(e) => setGoal({ ...goal, endDate: e.target.value })}
					/>
				</div>
				<button
					onClick={createGoal}
					className="bg-blue-500 text-white px-4 py-2 rounded-lg"
				>
					Save Goal
				</button>
			</div>

			{/* Habit Form */}
			<div className="border p-6 rounded-lg space-y-3">
				<h2 className="text-xl font-semibold">Add Habit</h2>
				<input
					type="text"
					placeholder="Habit name"
					className="border p-2 w-full"
					value={habit.name}
					onChange={(e) => setHabit({ ...habit, name: e.target.value })}
				/>
				<button
					onClick={createHabit}
					className="bg-green-500 text-white px-4 py-2 rounded-lg"
				>
					Save Habit
				</button>
			</div>
		</div>
	);
}
