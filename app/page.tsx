import React from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import getCurrentUser from "./actions/getCurrentUser";
import getUserGoals from "./actions/getUserGoals";

const Home = async () => {
	const currentUser = await getCurrentUser();
	const userGoals = await getUserGoals();
	return (
		<div>
			{currentUser && (
				<Dashboard currentUser={currentUser} userGoals={userGoals} />
			)}
		</div>
	);
};

export default Home;
