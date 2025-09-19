// components/RecommendationList.jsx
import React, { useContext } from 'react'
import Swal from 'sweetalert2'
import { AuthContext } from '../../context/AuthProvider'
import { authFetch } from '../../utils/authFetch'

const RecommendationList = ({ recommendations, refreshRecommendations }) => {
	const { user } = useContext(AuthContext)

	const handleDelete = async (recId) => {
		if (!user) {
			Swal.fire({
				icon: 'error',
				title: 'Not logged in',
				text: 'You must be logged in to delete a recommendation',
			})
			return
		}

		const confirm = await Swal.fire({
			title: 'Are you sure?',
			text: 'This recommendation will be deleted!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
		})

		if (!confirm.isConfirmed) return

		try {
			const res = await authFetch(
				`https://smart-pick-server-seven.vercel.app/recommendations/${recId}`,
				{
					method: 'DELETE',
				},
			)

			if (!res.ok) throw new Error('Failed to delete recommendation')
			await res.json()

			Swal.fire({
				icon: 'success',
				title: 'Deleted successfully',
				timer: 1200,
				showConfirmButton: false,
			})

			refreshRecommendations()
		} catch (err) {
			console.error(err)
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: err.message,
			})
		}
	}

	return (
		<div className='space-y-4'>
			<h3 className='text-xl font-bold mb-2'>All Recommendations</h3>
			{recommendations.map((rec) => (
				<div
					key={rec._id}
					className='bg-gray-50 p-4 rounded-lg shadow-sm flex gap-4 items-start'
				>
					{rec.recommendedProductImage && (
						<img
							src={rec.recommendedProductImage}
							alt={rec.recommendedProductName}
							className='w-16 h-16 object-cover rounded-lg'
						/>
					)}
					<div className='flex-1'>
						<p className='font-semibold'>{rec.recommendationTitle}</p>
						<p className='text-gray-600'>{rec.recommendedProductName}</p>
						<p className='text-gray-500 text-sm'>{rec.recommendationReason}</p>
						<p className='text-xs text-gray-400 mt-1'>
							By {rec.recommenderName} on{' '}
							{new Date(rec.date).toLocaleDateString()}
						</p>
					</div>
					{user?.email === rec.userEmail && (
						<button
							onClick={() => handleDelete(rec._id)}
							className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm'
						>
							Delete
						</button>
					)}
				</div>
			))}
		</div>
	)
}

export default RecommendationList
