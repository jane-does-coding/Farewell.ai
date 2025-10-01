"use client";
import { useState } from "react";

type Checkpoint = {
	title: string;
	date: string;
	notes: string;
};

type Link = {
	label: string;
	url: string;
};

type GoalForm = {
	title: string;
	description: string;
	startDate: string;
	endDate: string;
	checkpoints: Checkpoint[];
	links: Link[];
};

export default function CreatePage() {
	const [goal, setGoal] = useState<GoalForm>({
		title: "",
		description: "",
		startDate: "",
		endDate: "",
		checkpoints: [{ title: "", date: "", notes: "" }],
		links: [{ label: "", url: "" }],
	});

	const handleCheckpointChange = (
		index: number,
		field: keyof Checkpoint,
		value: string
	) => {
		const newCheckpoints = [...goal.checkpoints];
		newCheckpoints[index][field] = value;
		setGoal({ ...goal, checkpoints: newCheckpoints });
	};

	const addCheckpoint = () => {
		setGoal({
			...goal,
			checkpoints: [...goal.checkpoints, { title: "", date: "", notes: "" }],
		});
	};

	const handleLinkChange = (
		index: number,
		field: keyof Link,
		value: string
	) => {
		const newLinks = [...goal.links];
		newLinks[index][field] = value;
		setGoal({ ...goal, links: newLinks });
	};

	const addLink = () => {
		setGoal({
			...goal,
			links: [...goal.links, { label: "", url: "" }],
		});
	};

	const createGoal = async () => {
		await fetch("/api/goals", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(goal),
		});
		alert("Goal created!");
	};

	return (
		<div className="p-10 space-y-10">
			<h1 className="text-3xl font-bold">Create Goal</h1>

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

				{/* Checkpoints */}
				<div>
					<h3 className="font-semibold">Checkpoints</h3>
					{goal.checkpoints.map((c, i) => (
						<div key={i} className="flex gap-2 mt-2">
							<input
								type="text"
								placeholder="Title"
								className="border p-2"
								value={c.title}
								onChange={(e) =>
									handleCheckpointChange(i, "title", e.target.value)
								}
							/>
							<input
								type="date"
								className="border p-2"
								value={c.date}
								onChange={(e) =>
									handleCheckpointChange(i, "date", e.target.value)
								}
							/>
							<input
								type="text"
								placeholder="Notes"
								className="border p-2"
								value={c.notes}
								onChange={(e) =>
									handleCheckpointChange(i, "notes", e.target.value)
								}
							/>
						</div>
					))}
					<button
						onClick={addCheckpoint}
						className="text-sm text-blue-500 mt-2"
					>
						+ Add Checkpoint
					</button>
				</div>

				{/* Links */}
				<div>
					<h3 className="font-semibold">Links</h3>
					{goal.links.map((l, i) => (
						<div key={i} className="flex gap-2 mt-2">
							<input
								type="text"
								placeholder="Label"
								className="border p-2"
								value={l.label}
								onChange={(e) => handleLinkChange(i, "label", e.target.value)}
							/>
							<input
								type="url"
								placeholder="URL"
								className="border p-2"
								value={l.url}
								onChange={(e) => handleLinkChange(i, "url", e.target.value)}
							/>
						</div>
					))}
					<button onClick={addLink} className="text-sm text-blue-500 mt-2">
						+ Add Link
					</button>
				</div>

				<button
					onClick={createGoal}
					className="bg-blue-500 text-white px-4 py-2 rounded-lg"
				>
					Save Goal
				</button>
			</div>
		</div>
	);
}
