'use client';

import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import FormQuestion from './FormQuestion';

interface FormBoxProps {
	dataArray: any[];
	page: Number;
	onPreviousPage: () => void;
	onNextPage: () => void;
}

interface User {
	avatar: {
		link: string;
	};
	global_name: string;
}

export default function FormBox({
	page,
	dataArray,
	onPreviousPage,
	onNextPage,
}: FormBoxProps) {
	const [user, setUser] = useState<User>();

	const getUser = useCallback(async () => {
		try {
			const response = await axios.get(
				'https://discordlookup.mesavirep.xyz/v1/user/' +
					dataArray[0].userId,
			);
			setUser(response.data);
		} catch (error) {
			console.error('Erro enviando solicitação:', error);
		}
	}, [dataArray]);

	const deleteForm = useCallback(async () => {
		try {
			await axios.delete('/api/forms?id=' + dataArray[0].id);
		} catch (error) {
			console.error('Erro enviando solicitação:', error);
		}
	}, [dataArray]);

	useEffect(() => {
		getUser();
	}, [dataArray, getUser]);

	return (
		<main className="flex flex-col p-7 m-4 font-bold rounded-xl bg-zinc-800 text-neutral-400">
			{user && (
				<div className="flex gap-4 mx-auto items-center w-fit justify-center p-2 text-2xl whitespace-nowrap rounded-3xl bg-zinc-900">
					<img
						alt="Avatar"
						src={
							user.avatar?.link ||
							'https://cdn.discordapp.com/embed/avatars/0.png'
						}
						className="aspect-square w-12 rounded-full"
					/>
					<div className="flex flex-col">
						<h1>{user.global_name}</h1>
						<p className="text-sm">{dataArray[0].userId}</p>
					</div>
				</div>
			)}
			{Object.entries(dataArray[0].data).map(([key, value]) => (
				<FormQuestion
					key={key}
					question={key}
					response={value as string}
				/>
			))}
			<div className="flex gap-5 justify-between items-center p-4 mt-5 w-full whitespace-nowrap rounded-3xl bg-zinc-900 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
				<p className="my-auto text-2xl">
					{dataArray[0].guild === 0
						? 'Servidor do Goularte'
						: 'Subsolo do Goularte'}
				</p>
				<img
					src="/icons/delete.svg"
					alt="Delete"
					className="my-auto aspect-square w-12 cursor-pointer"
					onClick={() => {
						deleteForm();
						if ((dataArray[1].pagesTotal as Number) <= page)
							return onPreviousPage();
						return onNextPage();
					}}
				/>
				<div className="flex items-center justify-center gap-4 text-2xl">
					<img
						alt="Arrow Left"
						src="/icons/arrow_left.svg"
						onClick={onPreviousPage}
						className={
							'aspect-square w-12 cursor-pointer ' +
							(page === 1 ? 'hidden' : '')
						}
					/>
					<p>
						{page}/{dataArray[1].pagesTotal}
					</p>
					<img
						alt="Arrow Right"
						src="/icons/arrow_right.svg"
						onClick={onNextPage}
						className={
							'aspect-square w-12 cursor-pointer ' +
							((dataArray[1].pagesTotal as Number) <= page
								? 'hidden'
								: '')
						}
					/>
				</div>
			</div>
		</main>
	);
}
