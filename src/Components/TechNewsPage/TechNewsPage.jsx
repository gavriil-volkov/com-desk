import './index.css';
import TechNews from "../TechNews/TechNews"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect} from 'react';
import { ParceNews } from "../../Redux/actions/notes"

const TechNewsPage = () => {

  const dispatch = useDispatch();


  // const [news, setNews] = useState('')
  useEffect(() => {
    (() => {
      dispatch(ParceNews())
    })()
  }, [])
  const store = useSelector((state) => state.news);
  // const store = ['']



  return (
    <div className="newsPage">
      <div className="newsHeader">
        <h1><span className="yellowSymbols">//</span> Tech.News <span className="yellowSymbols">//</span></h1>
      </div>
      {store.map((element, index) => <TechNews index={index} key={element[0]} value={element} />)}
    </div>
  );
}

export default TechNewsPage;
