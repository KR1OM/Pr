import Cookies from 'cookies'
import Table from 'react-bootstrap/Table';
import Nav from '../components/nav';
import axios from 'axios'
import Loader from '../components/loader'
import { useEffect, useState } from 'react';
import { api, isArr } from '../../util/constant';
import Button from 'react-bootstrap/Button';
import ApplicationModal from './applicationModal'

export default function Applist(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [applicationsList, setApplicationsList] = useState([])
    const [isApplicationModal, setisApplicationModal] = useState(false);
    const [applicationDetails, setApplicationDetails] = useState({})
    const getApplications = () => {
        setIsLoading(true)
        axios.get(`${api}/form`, { withCredentials: true })
            .then(res => {
                setIsLoading(false);
                setApplicationsList(isArr(res.data));
            }).catch(e => console.log(e))
    }

    const viewApplicationDetails = (id) => {
        setIsLoading(true)
        axios.get(`${api}/form`, { headers: { id }, withCredentials: true })
            .then(res => {
                setApplicationDetails(res.data)
                setisApplicationModal(true)
                setIsLoading(false);
            }).catch(e => console.log(e))
    }

    useEffect(() => { getApplications() }, [])


    return (
        <>

            <Nav />
            <Loader isLoading={isLoading} />

            <ApplicationModal token={props.token} info={applicationDetails} modal={isApplicationModal} setModal={modal => setisApplicationModal(modal)} />
            <div className='container bgcolors21'>
                <h3 className='text-center'></h3>
                <div className="row mt-4 mb-4">
                    <div className="col-md-4">
                        <input type="text" className="form-control shadow rounded-pill" placeholder='search' />
                    </div>
                    <div className="col-md-2"><button className="btn btn-warning shadow rounded-pill w-100 text-light">Search</button></div>
                </div>
                <Applications applicationsList={applicationsList} viewApplicationDetails={id => viewApplicationDetails(id)} />
            </div>

        </>
    )
}

const Applications = ({ applicationsList, viewApplicationDetails }) => {

    return (
        <div style={{ overflowX: 'scroll' }}>

            <Table striped bordered hover size="sm" variant="light" className='shadow' >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Submission date</th>
                        <th>Company Name</th>
                        <th>Name</th>
                        <th>email</th>
                        <th>More Information</th>
                    </tr>
                </thead>
                <tbody>
                    {applicationsList.map((item, index) => <tr>
                        <td>{index}</td>
                        <td>{new Date(item.createdAt).toLocaleString()}</td>
                        <td>{item.companyName}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td className='text-center'>
                            <Button variant="light" onClick={() => {
                                viewApplicationDetails(item._id)
                            }}>
                                View
                            </Button>

                        </td>
                    </tr>)}
                </tbody>
            </Table>
        </div>
    )
}


export async function getServerSideProps({ req, res }) {
    const cookies = new Cookies(req, res);
    const token = cookies.get('token');
    if (token) {
        return { props: { token } }
    } else {
        return { redirect: { permanent: false, destination: `/login` } }
    }
}
