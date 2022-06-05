import { AppProps } from "next/app";
import Image from "next/image";
import React, { ReactChild } from "react";
import LOGO from "../../../public/logo.png";
import Router from "next/router"

interface LayoutProps {
	children: React.ReactNode;
	link: any
}

function Button({ children, link }: LayoutProps) {
	return (
		<button onClick={() => Router.push(link)} className="px-4 h-12 mb-5 rounded w-full flex flex-col justify-center hover:text-emerald-800 hover:bg-white">
			<p>{children}</p>
		</button>
	);
}

function Sider() {
	return (
		<div className="flex-1 h-full sticky bg-emerald-800 text-white">
			<div className="w-full flex justify-center items-center flex-col pt-4">
				<Image alt="alt-image" src={LOGO} width={160} height={200} />
			</div>
		</div>
	);
}

export default Sider;
