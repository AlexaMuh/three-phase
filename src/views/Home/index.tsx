import axios from "axios";
import React, { useEffect, useState } from "react";
import storageHandler from "../../helpers/storage";
import Box from "./partials/Box";

function Home() {
	const [adderShown, setAdderShown] = useState(false);
	const [addId, setAddId] = useState("");
	const [ids, setIds] = useState([]);

	const getData = async () => {
		if (!storageHandler.getValue("id")) {
			return storageHandler.setValue("id", JSON.stringify({ id: [] }));
		}
		const id = JSON.parse(storageHandler.getValue("id"));
		setIds(id.id);
	};

	const addHandler = async () => {
		if (!storageHandler.getValue("id")) {
			storageHandler.setValue("id", JSON.stringify({ id: [] }));
		}

		const currentId = JSON.parse(storageHandler.getValue("id"));

		if (currentId.id.includes(addId)) return;

		try {
			const result = await axios.get(
				`https://three-phase.herokuapp.com/data/${addId}/last`
			);

			storageHandler.setValue(
				"id",
				JSON.stringify({ id: [...currentId.id, result.data._id] })
			);

			getData();
			console.log(ids);
		} catch (error) {}
	};

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {}, [ids]);

	return (
		<div className="w-full h-44">
			<div className="w-full flex flex-col">
				<button
					onClick={() => setAdderShown(!adderShown)}
					className="p-2 bg-red-500 text-white font-bold text-2xl rounded-xl self-end"
				>
					Masukan ID Monitoring
				</button>
				{!adderShown ? null : (
					<div className="flex flex-row self-end items-center mt-4 gap-4">
						<p className="text-xl">Masukkan ID</p>
						<input
							onChange={(e: any) => setAddId(e.target.value)}
							className="rounded-xl border-2 border-blue-200 p-2"
						/>
						<div className="flex gap-2 flex-row">
							<button
								className="p-2 w-24 bg-red-500 text-white font-bold text-sm rounded-xl self-end"
								onClick={() => setAdderShown(!adderShown)}
							>
								Batal
							</button>
							<button
								className="p-2 w-24 bg-emerald-500 text-white font-bold text-sm rounded-xl self-end"
								onClick={addHandler}
							>
								Ok
							</button>
						</div>
					</div>
				)}
			</div>

			<div className="grid grid-cols-3 gap-4">
				{ids[0] ? (
					ids.map((e: any, i: number) => {
						return <Box ids={ids} setIds={setIds} id={e} key={i} />;
					})
				) : (
					<div className="col-span-3 p-6 bg-red-100 mt-8 flex flex-row items-center justify-center">
						<h1 className="text-6xl text-red-500 text-center font-bold">
							Anda belum memasukkan kode alat monitoring!
						</h1>
					</div>
				)}
			</div>
		</div>
	);
}

export default Home;
