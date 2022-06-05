import type { NextPage } from "next";
import Head from "next/head";
import MainLayout from "../layouts/MainLayout";
import ByID from "../views/Home/ByID";

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Three Phase</title>
			</Head>

			<MainLayout>
				<ByID />
			</MainLayout>
		</div>
	);
};

export default Home;
