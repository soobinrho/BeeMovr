import SocialMedia from '../components/social-media';

// The main difference between the main `/` route and `watsonx` route
// will be that the main page will show a summary of information, while
// `watsonx` page will give the user all the information we have so
// that our users can see the data and export the data.
export default function Watsonx() {
  return (
    <>
      <SocialMedia />
      <div className='flex min-h-screen flex-row items-center justify-center bg-background-space'>
        <div className='m-5 font-extrabold text-gray-300'>watsonx.data</div>
        <div className='text-gray-300'>
          TODO: Create a data analysis page. ML API call on the server side
          using watsonx.ai and watsonx.data and client-side data editing and
          visualization.
        </div>
      </div>
    </>
  );
}
