import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { requestData } from '../reducer/listSlice';

export default function Alert(props) {
  const dispatch = useDispatch()
  const handkeClick = () => {
    dispatch(requestData())
  }

  return (
    <div className="batch">
      <div className="alert alert-warning" role="alert">
        Произошла ошибка!
      </div>
      <Link type="button" className="btn btn-danger" onClick={handkeClick} to='/'>
        Перезагрузить
      </Link>
    </div>
  );
}
