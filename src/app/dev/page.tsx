'use client';
import FormBox from '@/components/FormBox';
import axios from 'axios';
import React, { useState, useCallback, useEffect } from 'react';

export default function Home() {
	const [page, setPage] = useState(1);
	const [data, setData] = useState([]);
	const [pageChanged, setPageChanged] = useState(true);

	const getForm = useCallback(async () => {
		try {
			const response = await axios.post('/api/forms', {
				type: 'DEV',
				page: page,
			});
			setData(response.data);
		} catch (error) {
			console.error('Erro enviando solicitação:', error);
		}
	}, [page]);

	const handlePreviousPage = () => {
		if (page > 1) {
			setPage(page - 1);
			setPageChanged(true);
		}
	};

	const handleNextPage = () => {
		setPage(page + 1);
		setPageChanged(true);
	};

	useEffect(() => {
		if (pageChanged) {
			getForm();
			setPageChanged(false);
		}
	}, [page, pageChanged, getForm]);

	return (
		<>
			{data && data.length > 0 ? (
				<FormBox
					dataArray={data}
					page={page}
					onPreviousPage={handlePreviousPage}
					onNextPage={handleNextPage}
				/>
			) : null}
		</>
	);
}
