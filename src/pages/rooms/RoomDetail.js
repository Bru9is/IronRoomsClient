import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom' 
import apiService from '../../services/api.service'
import TextAreaInput from '../../components/TextAreaInput'
import { AuthContext } from '../../contexts/authContext'

const RoomDetail = () => {
    const [room, setRoom] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showReviewForm, setShowReviewForm] = useState(false)
    const [reviewComment, setReviewComment] = useState('')
    const [refresh, setRefresh] = useState(false)

    const { isLoading, loggedInUser } = useContext(AuthContext)

    const { id } = useParams()

    useEffect(() => {
        async function fetchData() {
            try {
              const room = await apiService.getRoom(id)
              setRoom(room)
              setLoading(false)
            } catch (err) {
              console.log(err)
            }
          }

        fetchData()
    }, [id, refresh])

    const handleReviewSubmit = async e => {
        e.preventDefault()

        const review = {
            comment: reviewComment
        }

        try {
            await apiService.createReview(id, review)
            setRefresh(!refresh)
            setReviewComment('')
            setShowReviewForm(false)
        } catch (err) {
            console.log(err)
        }
    }

    if(loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="ml-3 mt-4">
            <div className="row">
                <div className="d-flex flex-column m-5">
                    <h1>{ room.name }</h1>
                    <img src={room.imageUrl} alt={room.description} />
                    <p>{ room.description }</p>

                    <div className="reviews">
                        <h2>Reviews</h2>
                        { room.reviews.length > 0 ? room.reviews.map(review => {
                            return <p>{ review.comment }</p>
                        })
                         : <p>This room has no reviews</p>
                         }
                    </div>
                    { (!isLoading && loggedInUser.token !== '') && (
                        <>
                            <button onClick={() => setShowReviewForm(true)} className="btn btn-primary">Review!</button>
                            { showReviewForm && (
                                <div className="review-form">
                                    <form onSubmit={handleReviewSubmit}>
                                        <TextAreaInput 
                                            name="comment"
                                            value={reviewComment}
                                            onChange={e => setReviewComment(e.target.value)}
                                            placeholder="Your comment"
                                            />
                                        <button className='btn btn-success'>Send review</button>
                                    </form>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default RoomDetail