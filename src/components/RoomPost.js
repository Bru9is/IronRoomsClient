import { Link } from "react-router-dom";
import { FaEye, FaTrash } from 'react-icons/fa'

function RoomPost(props) {

  const deleteButton = () => {
    if(props.loggedInUser.token !== '' && props.loggedInUser.user._id === props.post.userId) {
      return (
        <>| <FaTrash onClick={() => props.deleteRoom(props.post._id)} 
                className="delete-room-button text-danger" />
        </>
      )
    }
  }

  return (
    <div className="col-4">
      <div className="card border-0  mb-2" key={props.post._id}>
      <img
        src={props.post.imageUrl}
        className="card-img-top rounded-0"
        alt={props.post.caption}
      />
      <div className="card-body">
        <div className="w-100">
          <Link to={`/rooms/${props.post._id}`}>{props.post.name}</Link>
        </div>
        <div className="room-actions">
          <p>{props.post.userId}</p>
          <Link to={`/rooms/${props.post._id}`}>
            <FaEye className="text-info" />
          </Link> { deleteButton() }
        </div>
        <p>{props.post.description}</p>
      </div>
    </div>
    </div>
  );
}

export default RoomPost;