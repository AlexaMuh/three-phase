import type { NextPage } from "next";
import Head from "next/head";
import MainLayout from "../layouts/MainLayout";
import Homes from "../views/Home";

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Three Phase</title>
			</Head>

			<MainLayout>
				<Homes />
			</MainLayout>
		</div>
	);
};

export default Home;
