"use client";

import { useEffect, useState } from "react";

type Checkpoint = {
	title: string;
	date: string;
	notes?: string;
};

type LinkItem = {
	label: string;
	url: string;
};

type HabitRef = {
	id?: string;
	name?: string;
};

type GoalForm = {
	title: string;
	description: string;
	startDate: string;
	endDate: string;
	checkpoints: Checkpoint[];
	links: LinkItem[];
	habits: HabitRef[]; // mixture of { id } for existing or { name } for new
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
		// load existing habits so user can attach them
		fetch("/api/habits")
			.then((r) => r.json())
			.then((data) => {
				// API returns array of { id, name, doneToday }
				setAvailableHabits(data.map((h: any) => ({ id: h.id, name: h.name })));
			})
			.catch(console.error);
	}, []);

	// Checkpoint handlers
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

	// Link handlers
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

	// Habits: attach existing
	const isAttached = (habitId: string) =>
		goal.habits.some((h) => h.id === habitId);
	const toggleAttachHabit = (habit: { id: string; name: string }) => {
		if (isAttached(habit.id)) {
			setGoal({
				...goal,
				habits: goal.habits.filter((h) => h.id !== habit.id),
			});
		} else {
			setGoal({
				...goal,
				habits: [...goal.habits, { id: habit.id, name: habit.name }],
			});
		}
	};

	// Add a new habit (local only — will be created on server when creating the goal)
	const addNewHabitToGoal = () => {
		if (!newHabitName.trim()) return;
		setGoal({
			...goal,
			habits: [...goal.habits, { name: newHabitName.trim() }],
		});
		setNewHabitName("");
	};

	// Optionally allow quick create regular habit (persist immediately)
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
			// attach it to goal automatically
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
		try {
			// Simple client-side validation: ensure title
			if (!goal.title.trim()) {
				alert("Please provide a title");
				return;
			}

			const res = await fetch("/api/goals", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(goal),
			});

			if (!res.ok) {
				const json = await res.json().catch(() => ({}));
				console.error("create goal error", json);
				alert("Failed to create goal");
				return;
			}

			alert("Goal created!");
			// reset form
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
			alert("Unexpected error creating goal");
		}
	};

	return (
		<div className="p-6 max-w-4xl mx-auto text-white">
			<h1 className="text-3xl font-bold mb-6">Create Goal</h1>

			<div className="space-y-4">
				<input
					className="w-full p-2 rounded-md text-black"
					placeholder="Goal title"
					value={goal.title}
					onChange={(e) => setGoal({ ...goal, title: e.target.value })}
				/>

				<textarea
					className="w-full p-2 rounded-md text-black"
					placeholder="Description"
					value={goal.description}
					onChange={(e) => setGoal({ ...goal, description: e.target.value })}
				/>

				<div className="flex gap-4">
					<div className="flex-1">
						<label className="block mb-1">Start date</label>
						<input
							type="date"
							className="w-full p-2 rounded-md text-black"
							value={goal.startDate}
							onChange={(e) => setGoal({ ...goal, startDate: e.target.value })}
						/>
					</div>
					<div className="flex-1">
						<label className="block mb-1">End date</label>
						<input
							type="date"
							className="w-full p-2 rounded-md text-black"
							value={goal.endDate}
							onChange={(e) => setGoal({ ...goal, endDate: e.target.value })}
						/>
					</div>
				</div>

				{/* Checkpoints */}
				<div>
					<h3 className="text-lg font-semibold mb-2">Checkpoints</h3>
					<div className="space-y-2">
						{goal.checkpoints.map((cp, i) => (
							<div key={i} className="p-3 rounded-md bg-neutral-800">
								<div className="flex items-center justify-between mb-2">
									<strong>Checkpoint {i + 1}</strong>
									<button
										className="text-sm text-red-400"
										onClick={() => removeCheckpoint(i)}
									>
										Remove
									</button>
								</div>
								<input
									className="w-full p-2 mb-2 rounded-md text-black"
									placeholder="Title"
									value={cp.title}
									onChange={(e) => updateCheckpoint(i, "title", e.target.value)}
								/>
								<input
									type="date"
									className="w-full p-2 mb-2 rounded-md text-black"
									value={cp.date}
									onChange={(e) => updateCheckpoint(i, "date", e.target.value)}
								/>
								<input
									className="w-full p-2 rounded-md text-black"
									placeholder="Notes (optional)"
									value={cp.notes}
									onChange={(e) => updateCheckpoint(i, "notes", e.target.value)}
								/>
							</div>
						))}
						<button className="text-blue-400 mt-2" onClick={addCheckpoint}>
							+ Add checkpoint
						</button>
					</div>
				</div>

				{/* Links */}
				<div>
					<h3 className="text-lg font-semibold mb-2">Links</h3>
					<div className="space-y-2">
						{goal.links.map((l, i) => (
							<div key={i} className="flex gap-2">
								<input
									className="flex-1 p-2 rounded-md text-black"
									placeholder="Label"
									value={l.label}
									onChange={(e) => updateLink(i, "label", e.target.value)}
								/>
								<input
									className="flex-1 p-2 rounded-md text-black"
									placeholder="URL"
									value={l.url}
									onChange={(e) => updateLink(i, "url", e.target.value)}
								/>
								<button className="text-red-400" onClick={() => removeLink(i)}>
									Remove
								</button>
							</div>
						))}
						<button className="text-blue-400 mt-2" onClick={addLink}>
							+ Add link
						</button>
					</div>
				</div>

				{/* Habits */}
				<div>
					<h3 className="text-lg font-semibold mb-2">Habits</h3>

					{/* existing habits to attach */}
					<div className="mb-2">
						<div className="mb-1 text-sm">Attach existing habits</div>
						<div className="flex flex-wrap gap-2">
							{availableHabits.map((h) => (
								<button
									key={h.id}
									type="button"
									onClick={() => toggleAttachHabit(h)}
									className={`px-3 py-1 rounded-full border ${
										isAttached(h.id)
											? "bg-blue-600 text-white"
											: "bg-neutral-800 text-white"
									}`}
								>
									{isAttached(h.id) ? `Attached: ${h.name}` : h.name}
								</button>
							))}
							{availableHabits.length === 0 && (
								<div className="text-sm text-neutral-400">No habits yet</div>
							)}
						</div>
					</div>

					{/* add new habit to attach (local for this goal) */}
					<div className="flex gap-2 items-center">
						<input
							className="flex-1 p-2 rounded-md text-black"
							placeholder="New habit name (attach to this goal)"
							value={newHabitName}
							onChange={(e) => setNewHabitName(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									addNewHabitToGoal();
								}
							}}
						/>
						<button
							className="px-3 py-1 rounded-md bg-blue-600"
							onClick={addNewHabitToGoal}
						>
							Add (local)
						</button>
						<button
							className="px-3 py-1 rounded-md bg-green-600"
							onClick={createRegularHabit}
						>
							Create & attach (persist)
						</button>
					</div>

					{/* show attached */}
					<div className="mt-2">
						<div className="text-sm mb-1">Attached to goal</div>
						<div className="flex flex-wrap gap-2">
							{goal.habits.length === 0 && (
								<div className="text-neutral-400">No habits attached</div>
							)}
							{goal.habits.map((h, i) => (
								<div key={i} className="px-3 py-1 rounded-full bg-neutral-700">
									<span>
										{h.name ??
											availableHabits.find((a) => a.id === h.id)?.name ??
											"Habit"}
									</span>
									<button
										className="ml-2 text-red-400"
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
				</div>

				<div>
					<button
						className="px-4 py-2 bg-blue-600 rounded-md"
						onClick={handleSubmit}
					>
						Save Goal
					</button>
				</div>
			</div>
		</div>
	);
}
