import { useDispatch } from "react-redux";
import { requestDataById } from '../reducer/listSlice';


export default function ListItem(props) {
  const { name, price, id } = props.item;

  const dispatch = useDispatch();

  const handleShow = async () => {
    dispatch(requestDataById(id));
    props.history.push(`/services/:${id}`);
  };

  return (
    <li className="list-group-item">
      <div>
        <span>{name} </span>
        <span>{price} </span>
        <button type="button" className="btn btn-danger" onClick={handleShow}>
          Show
        </button>
      </div>
    </li>
  );
}