"use client";

import { useEffect, useState } from "react";

type Checkpoint = { title: string; date: string; notes?: string };
type LinkItem = { label: string; url: string };
type HabitRef = { id?: string; name?: string };
type GoalForm = {
	title: string;
	description: string;
	startDate: string;
	endDate: string;
	checkpoints: Checkpoint[];
	links: LinkItem[];
	habits: HabitRef[];
};

export default function CreateGoalPage() {
	const [goal, setGoal] = useState<GoalForm>({
		title: "",
		description: "",
		startDate: "",
		endDate: "",
		checkpoints: [{ title: "", date: "", notes: "" }],
		links: [{ label: "", url: "" }],
		habits: [],
	});
	const [availableHabits, setAvailableHabits] = useState<
		{ id: string; name: string }[]
	>([]);
	const [newHabitName, setNewHabitName] = useState("");

	useEffect(() => {
		fetch("/api/habits")
			.then((r) => r.json())
			.then((data) =>
				setAvailableHabits(data.map((h: any) => ({ id: h.id, name: h.name })))
			)
			.catch(console.error);
	}, []);

	const updateCheckpoint = (
		index: number,
		field: keyof Checkpoint,
		value: string
	) => {
		const cp = [...goal.checkpoints];
		cp[index][field] = value;
		setGoal({ ...goal, checkpoints: cp });
	};
	const addCheckpoint = () =>
		setGoal({
			...goal,
			checkpoints: [...goal.checkpoints, { title: "", date: "", notes: "" }],
		});
	const removeCheckpoint = (index: number) => {
		const cp = [...goal.checkpoints];
		cp.splice(index, 1);
		setGoal({
			...goal,
			checkpoints: cp.length ? cp : [{ title: "", date: "", notes: "" }],
		});
	};

	const updateLink = (index: number, field: keyof LinkItem, value: string) => {
		const links = [...goal.links];
		links[index][field] = value;
		setGoal({ ...goal, links });
	};
	const addLink = () =>
		setGoal({ ...goal, links: [...goal.links, { label: "", url: "" }] });
	const removeLink = (index: number) => {
		const links = [...goal.links];
		links.splice(index, 1);
		setGoal({
			...goal,
			links: links.length ? links : [{ label: "", url: "" }],
		});
	};

	const isAttached = (habitId: string) =>
		goal.habits.some((h) => h.id === habitId);
	const toggleAttachHabit = (habit: { id: string; name: string }) => {
		setGoal({
			...goal,
			habits: isAttached(habit.id)
				? goal.habits.filter((h) => h.id !== habit.id)
				: [...goal.habits, { id: habit.id, name: habit.name }],
		});
	};

	const addNewHabitToGoal = () => {
		if (!newHabitName.trim()) return;
		setGoal({
			...goal,
			habits: [...goal.habits, { name: newHabitName.trim() }],
		});
		setNewHabitName("");
	};

	const createRegularHabit = async () => {
		if (!newHabitName.trim()) return;
		try {
			const res = await fetch("/api/habits", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name: newHabitName.trim() }),
			});
			if (!res.ok) throw new Error("Failed");
			const created = await res.json();
			setAvailableHabits((prev) => [
				...prev,
				{ id: created.id, name: created.name },
			]);
			setGoal((prev) => ({
				...prev,
				habits: [...prev.habits, { id: created.id, name: created.name }],
			}));
			setNewHabitName("");
		} catch (err) {
			console.error(err);
			alert("Failed to create habit");
		}
	};

	const handleSubmit = async () => {
		if (!goal.title.trim()) return alert("Please provide a title");
		try {
			const res = await fetch("/api/goals", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(goal),
			});
			if (!res.ok) throw new Error("Failed to create goal");
			alert("Goal created!");
			setGoal({
				title: "",
				description: "",
				startDate: "",
				endDate: "",
				checkpoints: [{ title: "", date: "", notes: "" }],
				links: [{ label: "", url: "" }],
				habits: [],
			});
		} catch (err) {
			console.error(err);
			alert("Error creating goal");
		}
	};

	return (
		<div className="px-[5vw] py-6 max-w-5xl mx-auto text-gray-900">
			<h2 className="pixel-sport text-[8vh] mb-6">Create Goal</h2>

			<div className="space-y-6">
				{/* Goal info */}
				<div className="flex flex-col gap-4">
					<input
						className="p-3 rounded-lg bg-white border border-gray-300 text-gray-900 text-[2vh]"
						placeholder="Goal title"
						value={goal.title}
						onChange={(e) => setGoal({ ...goal, title: e.target.value })}
					/>
					<textarea
						className="p-3 rounded-lg bg-white border border-gray-300 text-gray-900 text-[2vh]"
						placeholder="Description"
						value={goal.description}
						onChange={(e) => setGoal({ ...goal, description: e.target.value })}
					/>
					<div className="flex gap-4">
						<input
							type="date"
							className="p-2 rounded-lg bg-white border border-gray-300 text-gray-900"
							value={goal.startDate}
							onChange={(e) => setGoal({ ...goal, startDate: e.target.value })}
						/>
						<input
							type="date"
							className="p-2 rounded-lg bg-white border border-gray-300 text-gray-900"
							value={goal.endDate}
							onChange={(e) => setGoal({ ...goal, endDate: e.target.value })}
						/>
					</div>
				</div>

				{/* Checkpoints */}
				<div className="space-y-3">
					<h3 className="text-[2.5vh] font-bold">Checkpoints</h3>
					{goal.checkpoints.map((cp, i) => (
						<div
							key={i}
							className="p-4 rounded-lg bg-gray-100 border border-gray-300"
						>
							<div className="flex justify-between items-center mb-2">
								<strong>Checkpoint {i + 1}</strong>
								<button
									className="text-red-500"
									onClick={() => removeCheckpoint(i)}
								>
									Remove
								</button>
							</div>
							<input
								className="w-full p-2 mb-2 rounded-lg bg-white border border-gray-300 text-gray-900"
								placeholder="Title"
								value={cp.title}
								onChange={(e) => updateCheckpoint(i, "title", e.target.value)}
							/>
							<input
								type="date"
								className="w-full p-2 mb-2 rounded-lg bg-white border border-gray-300 text-gray-900"
								value={cp.date}
								onChange={(e) => updateCheckpoint(i, "date", e.target.value)}
							/>
							<input
								className="w-full p-2 rounded-lg bg-white border border-gray-300 text-gray-900"
								placeholder="Notes"
								value={cp.notes}
								onChange={(e) => updateCheckpoint(i, "notes", e.target.value)}
							/>
						</div>
					))}
					<button className="text-blue-600" onClick={addCheckpoint}>
						+ Add checkpoint
					</button>
				</div>

				{/* Links */}
				<div className="space-y-3">
					<h3 className="text-[2.5vh] font-bold">Links</h3>
					{goal.links.map((l, i) => (
						<div key={i} className="flex gap-2">
							<input
								className="flex-1 p-2 rounded-lg bg-white border border-gray-300 text-gray-900"
								placeholder="Label"
								value={l.label}
								onChange={(e) => updateLink(i, "label", e.target.value)}
							/>
							<input
								className="flex-1 p-2 rounded-lg bg-white border border-gray-300 text-gray-900"
								placeholder="URL"
								value={l.url}
								onChange={(e) => updateLink(i, "url", e.target.value)}
							/>
							<button className="text-red-500" onClick={() => removeLink(i)}>
								Remove
							</button>
						</div>
					))}
					<button className="text-blue-600" onClick={addLink}>
						+ Add link
					</button>
				</div>

				{/* Habits */}
				<div>
					<h3 className="text-[2.5vh] font-bold mb-2">Habits</h3>
					<div className="flex flex-wrap gap-2 mb-2">
						{availableHabits.map((h) => (
							<button
								key={h.id}
								type="button"
								onClick={() => toggleAttachHabit(h)}
								className={`px-3 py-1 rounded-full border ${
									isAttached(h.id)
										? "bg-blue-600 text-white"
										: "bg-gray-200 text-gray-900"
								}`}
							>
								{h.name}
							</button>
						))}
					</div>
					<div className="flex gap-2">
						<input
							className="flex-1 p-2 rounded-lg bg-white border border-gray-300 text-gray-900"
							placeholder="New habit name"
							value={newHabitName}
							onChange={(e) => setNewHabitName(e.target.value)}
						/>
						<button
							className="px-3 py-1 bg-blue-600 text-white rounded-lg"
							onClick={addNewHabitToGoal}
						>
							Add (local)
						</button>
						<button
							className="px-3 py-1 bg-green-600 text-white rounded-lg"
							onClick={createRegularHabit}
						>
							Create & attach
						</button>
					</div>

					{/* attached */}
					<div className="flex flex-wrap gap-2 mt-2">
						{goal.habits.map((h, i) => (
							<div
								key={i}
								className="px-3 py-1 rounded-full bg-gray-200 flex items-center gap-2 text-gray-900"
							>
								<span>
									{h.name ??
										availableHabits.find((a) => a.id === h.id)?.name ??
										"Habit"}
								</span>
								<button
									className="text-red-500"
									onClick={() =>
										setGoal({
											...goal,
											habits: goal.habits.filter((_, idx) => idx !== i),
										})
									}
								>
									x
								</button>
							</div>
						))}
					</div>
				</div>

				<button
					className="px-4 py-2 bg-blue-600 text-white rounded-lg text-[2vh]"
					onClick={handleSubmit}
				>
					Save Goal
				</button>
			</div>
		</div>
	);
}
