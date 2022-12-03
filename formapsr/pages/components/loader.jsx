import ClipLoader from "react-spinners/ClipLoader";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "green",
};

function Loader({ isLoading }) {

    return (
        isLoading ? <div className="position-fixed loader" style={{ height: '100vh', width: '100vw', top: 0, left: 0, backgroundColor: 'rgba(255,255,255,0.5)' }}>
            <div className="center-div">
                <ClipLoader
                    loading={true}
                    cssOverride={override}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </div> : null
    );
}

export default Loader;