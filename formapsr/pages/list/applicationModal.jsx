import Modal from 'react-bootstrap/Modal';
import { api, isArr } from '../../util/constant';

function ApplicationModal(props) {
    const toggle = () => props.setModal(prev => !prev)
    const downloadFile = filename => window.open(`${api}/form/download/${filename}/${props.token}`)
    return (
        <Modal
            show={props.modal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={toggle}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Application information
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p> <span className="fw-bold"> Submission date<br /></span>{props?.info?.createdAt}</p>
                <p> <span className="fw-bold">Company Name <br /></span> {props?.info?.companyName}</p>
                <p> <span className="fw-bold">Name<br /></span>{props?.info?.name}</p>
                <p> <span className="fw-bold">Email<br /></span>{props?.info?.email}</p>
                <p> <span className="fw-bold">Phone number<br /></span> {props?.info?.phoneNumber}</p>
                <p> <span className="fw-bold">Telephone Number<br /></span>{props?.info?.telephoneNumber}</p>
                <p> <span className="fw-bold">Form ID<br /></span>{props?.info?.uniqID}</p>
                <p> <span className="fw-bold">Form Type<br /></span>{props?.info?.formType}</p>
                <p> <h5>files :</h5>
                    <ul>
                        {isArr(props?.info?.uploads).map((item, index) => <li><button className="btn btn-light shadow p-1 mt-1" onClick={() => downloadFile(item)}>Download file {index + 1}</button></li>)}
                    </ul>
                </p>
            </Modal.Body>
            <Modal.Footer>
                <button className='btn btn-warning' onClick={toggle}>Close</button>
            </Modal.Footer>
        </Modal>
    );
}

export default ApplicationModal
