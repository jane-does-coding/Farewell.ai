"use client";
import { FaRegTrashAlt } from "react-icons/fa";

import { useEffect, useState } from "react";

type Habit = {
	id: string;
	name: string;
	doneToday: boolean;
};

export default function TodaysTasks() {
	const [habits, setHabits] = useState<Habit[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchHabits();
	}, []);

	async function fetchHabits() {
		try {
			const res = await fetch("/api/habits");
			if (!res.ok) throw new Error("Failed to fetch habits");
			const data = await res.json();
			setHabits(data);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	}

	async function toggleHabit(habitId: string) {
		try {
			const res = await fetch("/api/habits/progress", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ habitId }),
			});
			if (!res.ok) throw new Error("Failed toggling habit");
			const updated = await res.json();

			setHabits((prev) =>
				prev.map((h) =>
					h.id === habitId ? { ...h, doneToday: updated.done } : h
				)
			);
		} catch (err) {
			console.error(err);
		}
	}

	async function deleteHabit(habitId: string) {
		if (!confirm("Are you sure you want to delete this habit?")) return;

		try {
			const res = await fetch(`/api/habits/${habitId}`, {
				method: "DELETE",
			});
			if (!res.ok) throw new Error("Failed to delete habit");

			setHabits((prev) => prev.filter((h) => h.id !== habitId));
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<div className="w-full">
			<h2 className="pixel-sport text-[6vh] leading-[6vh] mb-[1.75vh]">
				Today's Tasks
			</h2>

			{loading && <div className="text-neutral-400">Loading...</div>}

			{!loading && habits.length === 0 && (
				<div className="text-neutral-400">No habits for today</div>
			)}

			<div className="space-y-2">
				{habits.map((habit) => (
					<div
						key={habit.id}
						className="flex items-center justify-between gap-4"
					>
						<span className="text-[2.5vh]">{habit.name}</span>

						<div className="flex items-center gap-2">
							<input
								type="checkbox"
								checked={habit.doneToday}
								onChange={() => toggleHabit(habit.id)}
								className="w-5 h-5 cursor-pointer"
							/>
							<button
								onClick={() => deleteHabit(habit.id)}
								className="text-red-500 text-[1.5vh] px-2 py-[1vh] rounded-full border border-red-500 hover:bg-red-500/20 hover:text-black transition"
							>
								<FaRegTrashAlt />
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
