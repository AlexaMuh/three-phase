/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

function ByID() {
	const [dataTable, setDataTable] = useState({ lastUpdate: "", data: [], name: "" });
	const [textCopy, setTextCopy] = useState("Copy");
	const router = useRouter().query;
	const { id }: any = router;

	const getData = async () => {
		try {
			const { data }: any = await axios.get("https://three-phase.herokuapp.com/data/" + id);
			setDataTable(data);
		} catch (error) {
			alert(error);
		}
	};

	useEffect(() => {
		if (!id) return;
		getData();
	}, [id]);

	useEffect(() => {
		const socket = socketIOClient("wss://three-phase.herokuapp.com");
		socket.on(id, async (data: any) => {
			setDataTable(data);
		});
	}, []);

	return (
		<div>
			<div className="text-lg mb-8">
				Data Monitoring Untuk Device : <br />
				<span className="text-4xl text-red-500 font-bold">{dataTable.name}</span>
				<div className="flex flex-row items-center">
					<span className="text-4xl text-red-500 font-bold">{id}</span>
					<button
						className="p-2 mx-2 bg-gray-600 text-white rounded-xl duration-700"
						onClick={() => {
							navigator.clipboard.writeText(id);
							setTextCopy("Copied");
							setTimeout(() => {
								setTextCopy("Copy");
							}, 1000);
						}}
					>
						{textCopy}
					</button>
				</div>
			</div>
			<table>
				<tr>
					<th>Daya PZEM</th>
					<th>Daya Fotodioda</th>
					<th>Kesalahan Meter (%)</th>
					<th>Kelas Meter</th>
					<th>Kesehatan Meter</th>
					<th>Keadaan Relay</th>
					<th>Tagihan Susulan</th>
					<th>Waktu</th>
				</tr>
				{dataTable.data.map((el: any, i: number) => {
					return (
						<tr key={i}>
							<td>{el.pzem_power}</td>
							<td>{el.photodiode_power}</td>
							<td>{el.meter_error}</td>
							<td>{el.class}</td>
							<td>{el.meter_health}</td>
							<td>{el.relay}</td>
							<td>{el.invoice}</td>
							<td>{new Date(el.lastUpdate).toLocaleString()}</td>
						</tr>
					);
				})}
			</table>
		</div>
	);
}

export default ByID;
