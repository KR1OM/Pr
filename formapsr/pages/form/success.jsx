import { useRouter } from "next/router"
import { motion as m } from "framer-motion";
export default function Success(props) {
    const router = useRouter();
    const { isEng } = router.query;

    return (
        <m.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-screen flex items-center justify-center">





            <div className='position-relative login-container'>
                <div className="center-div  border shadow  rounded  " style={{ maxWidth: "700px" }}>
                    <div className='text-center row  shadow rounded  bg-light'>
                        <div className="col-md-12 p-2 h1 mt-3 mb-3 text-center ">{isEng == 'true' ? "submitted successfully " : "تم الارسال بنجاح"}</div>
                        <div className="col-md-12 fw-bold p-2">{isEng == 'true' ? 'Thanks for your Submition' : 'شكرا لك'} </div>
                    </div>
                </div>
            </div>


        </m.main>
    )
}