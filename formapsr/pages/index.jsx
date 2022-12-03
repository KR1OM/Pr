import Cookies from 'cookies'
import Nav from './components/nav';

export default function Home() {
  return (
    <>
      <Nav />
      <div>
        <p className='text-center pt-4 mt-3'> <span className=' h1  rounded-pill shadow bg-light p-3'>Welcome back</span></p>
      </div>
    </>
  )
}
export async function getServerSideProps({ req, res }) {
  const cookies = new Cookies(req, res);
  const token = cookies.get('token');
  if (token) {
    return { props: {} }
  } else {
    return { redirect: { permanent: false, destination: `/login` } }
  }
}
