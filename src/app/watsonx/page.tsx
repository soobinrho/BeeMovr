import SocialMedia from '../components/social-media';

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
