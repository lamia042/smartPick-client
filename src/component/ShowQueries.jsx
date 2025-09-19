import React, { useEffect, useState } from 'react'
import QueryCard from './QueryCard'

const ShowQueries = () => {
	const [queries, setQueries] = useState([])
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchQueries = async () => {
			try {
				const res = await fetch(
					'https://smart-pick-server-seven.vercel.app/queries',
				)
				const data = await res.json()
				setQueries(data)
			} catch (err) {
				console.error(err)
				setError(err.message)
			}
		}
		fetchQueries()
	}, [])

	if (error) return <p className='text-center py-10 text-red-600'>{error}</p>
	if (!queries.length)
		return <p className='text-center py-10'>Loading queries...</p>

	return (
		<div className='max-w-7xl mx-auto py-8 px-4'>
			<h2 className='text-3xl font-bold mb-6 text-center text-gray-800'>
				Recent Queries
			</h2>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{queries.map((query) => (
					<QueryCard key={query._id} query={query} />
				))}
			</div>
		</div>
	)
}

export default ShowQueries
