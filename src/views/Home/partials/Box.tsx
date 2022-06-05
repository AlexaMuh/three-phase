/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import Router from "next/router";
import storageHandler from "../../../helpers/storage";

function Box({ id, ids, setIds }: any) {
	const [isDeleleCalled, setDeleteCalled] = useState(false);
	const [deviceData, setDeviceData] = useState({
		_id: "",
		data: {
			lastUpdate: "",
		},
		name: "",
	});
	const getData = async () => {
		try {
			const { data } = await axios.get(`https://three-phase.herokuapp.com/data/${id}/last`);
			setDeviceData(data);
		} catch (error: any) {
			if (error.response.status == 404) {
				const newId: any = [];
				ids.forEach((_id: any) => {
					if (_id != id) newId.push(_id);
				});

				storageHandler.setValue("id", JSON.stringify({ id: newId }));
				setIds(newId);
			}
		}
	};

	const removeHandler = async () => {
		const newId: any = [];
		ids.forEach((_id: any) => {
			if (_id != id) newId.push(_id);
		});

		storageHandler.setValue("id", JSON.stringify({ id: newId }));
		setIds(newId);
	};

	useEffect(() => {
		if (!id) return;
		getData();
	}, []);

	return (
		<div className="w-full bg-yellow-100 rounded-2xl mt-10 p-4">
			<div className="mb-2">
				<p className="text-sm">Name :</p>
				<p className="text-xl font-bold">{deviceData?.name}</p>
			</div>
			<div className="mb-2">
				<p className="text-sm">Device ID :</p>
				<p className="text-xl font-bold">{id}</p>
			</div>
			<div className="mb-2">
				<p className="text-sm">Last Update :</p>
				<p className="text-xl font-bold">
					{new Date(deviceData?.data.lastUpdate).toLocaleString()}
				</p>
			</div>
			<div className="flex flex-row gap-4 mt-4 justify-end w-full">
				<button
					onClick={() => Router.push(Router.asPath + id)}
					className="text-lg p-2 bg-emerald-500 text-white font-semibold w-24 rounded-xl self-end hover:bg-emerald-300 duration-700"
				>
					Open
				</button>
				<button
					onClick={() => setDeleteCalled(true)}
					className="text-lg p-2 bg-red-500 text-white font-semibold w-24 rounded-xl self-end hover:bg-red-300 duration-700"
				>
					Remove
				</button>
			</div>
			{isDeleleCalled ? (
				<div className="h-screen w-screen bg-gray-700 bg-opacity-40 absolute inset-0 flex items-center justify-center">
					<div className="w-6/12 bg-white h-44 p-4">
						<h4 className="text-2xl font-bold text-red-500">
							Apakah anda ingin menghapus device ini dari daftar monitoring
							anda?
						</h4>
						<div className="flex flex-row gap-4 mt-4 justify-end w-full">
							<button
								onClick={() => setDeleteCalled(false)}
								className="text-lg p-2 bg-gray-500 text-white font-semibold w-24 rounded-xl self-end hover:bg-gray-300 duration-700"
							>
								Batal
							</button>
							<button
								onClick={removeHandler}
								className="text-lg p-2 bg-red-500 text-white font-semibold w-24 rounded-xl self-end hover:bg-red-300 duration-700"
							>
								Hapus
							</button>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
}

export default Box;
