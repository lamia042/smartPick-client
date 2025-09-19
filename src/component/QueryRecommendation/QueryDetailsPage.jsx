// pages/QueryDetailsPage.jsx
import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router'
import { getAuth } from 'firebase/auth'
import QueryInfo from '../components/QueryInfo'
import UserInfo from '../components/UserInfo'
import AddRecommendationForm from '../components/AddRecommendationForm'
import RecommendationList from '../components/RecommendationList'
import { AuthContext } from '../context/AuthProvider'

const QueryDetailsPage = () => {
	const { id } = useParams()
	const { user } = useContext(AuthContext)
	const auth = getAuth()

	const [query, setQuery] = useState(null)
	const [recommendations, setRecommendations] = useState([])
	const [loadingQuery, setLoadingQuery] = useState(true)
	const [loadingRecs, setLoadingRecs] = useState(true)
	const [error, setError] = useState(null)

	// Fetch query details with Firebase JWT
	const fetchQuery = async () => {
		setLoadingQuery(true)
		try {
			const idToken = user ? await auth.currentUser.getIdToken() : null
			const res = await fetch(
				`https://smart-pick-server-seven.vercel.app/queries/${id}`,
				{
					headers: idToken ? { Authorization: `Bearer ${idToken}` } : {},
				},
			)
			if (!res.ok) throw new Error('Failed to fetch query')
			const data = await res.json()
			setQuery(data)
		} catch (err) {
			console.error(err)
			setError(err.message)
		} finally {
			setLoadingQuery(false)
		}
	}

	// Fetch recommendations for this query with JWT
	const fetchRecommendations = async () => {
		setLoadingRecs(true)
		try {
			const idToken = user ? await auth.currentUser.getIdToken() : null
			const res = await fetch(
				`https://smart-pick-server-seven.vercel.app/recommendations?queryId=${id}`,
				{
					headers: idToken ? { Authorization: `Bearer ${idToken}` } : {},
				},
			)
			if (!res.ok) throw new Error('Failed to fetch recommendations')
			const data = await res.json()
			setRecommendations(data)
		} catch (err) {
			console.error(err)
			setError(err.message)
		} finally {
			setLoadingRecs(false)
		}
	}

	useEffect(() => {
		fetchQuery()
		fetchRecommendations()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, user])

	if (loadingQuery)
		return <p className='text-center py-10'>Loading query details...</p>
	if (error) return <p className='text-center py-10 text-red-600'>{error}</p>
	if (!query) return <p className='text-center py-10'>Query not found</p>

	return (
		<div className='max-w-4xl mx-auto py-8 px-4'>
			<QueryInfo query={query} />
			<UserInfo
				user={{
					name: query.name,
					email: query.email,
					profileImage: query.profileImage,
				}}
			/>
			<AddRecommendationForm
				queryId={query._id}
				queryTitle={query.queryTitle}
				queryProductName={query.productName}
				queryUserEmail={query.email}
				queryUserName={query.name}
				refreshRecommendations={fetchRecommendations}
			/>
			{loadingRecs ? (
				<p className='text-center py-4'>Loading recommendations...</p>
			) : (
				<RecommendationList recommendations={recommendations} />
			)}
		</div>
	)
}

export default QueryDetailsPage
