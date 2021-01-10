import { useSelector } from 'react-redux'
import './index.css'

function Loader() {

  const loader = useSelector(state => state.loader)

  return (
    loader && 
    <div className="d-flex justify-content-center">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  )
}


export default Loader
