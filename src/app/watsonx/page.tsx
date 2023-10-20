import InformationConsoleWatsonx from '@/app/components/information-console-watsonx';
import MLLabHeader from '@/app/components/ml-lab-header';
import ReturnToHomeButton from '@/app/components/return-to-home-button';
import SocialMedia from '@/app/components/social-media';
import Link from 'next/link';

// The main difference between the main `/` route and `watsonx` route
// will be that the main page will show a summary of information, while
// `watsonx` page will give the user all the information we have so
// that our users can see the data and export the data.
export default function Watsonx() {
  return (
    <>
      <ReturnToHomeButton />
      <MLLabHeader />
      <SocialMedia />
      <div className='flex min-h-screen flex-col content-center items-center justify-center gap-5 overflow-y-auto bg-background-space'>
        <a
          className='mt-24 text-center text-5xl text-white hover:text-cyan-200 hover:drop-shadow-md active:text-cyan-300 sm:text-9xl'
          target='_blank'
          href='https://github.com/soobinrho/BeeMovr/tree/main/watsonx'
          rel='noopener noreferrer'
        >
          WATSONX
        </a>
        <div className='mx-5 flex max-w-6xl flex-row items-center'>
          <span className='m-5 font-extrabold text-gray-300'>watsonx.ai</span>
          <div className='text-gray-300'>
            {`We plan to use watsonx.ai to improve our core prediction model for honey yield.`}
          </div>
        </div>

        <div className='mx-5 flex max-w-6xl flex-row items-center'>
          <span className='m-5 font-extrabold text-gray-300'>watsonx.data</span>
          <div className='text-gray-300'>
            {`We plan to use watson.data to manage data pipelines and security controls.`}
          </div>
        </div>

        <div className='mx-5 flex max-w-6xl flex-row items-center mb-10'>
          <span className='m-5 font-extrabold text-gray-300'>
            Watson Studio
          </span>
          <div className='text-gray-300'>
            {`We plan to use Watson Studio to create AI models that can help beekeepers minimize
            their colony loss and maximize survival rates. USDA (U.S. Department of Agriculture)
            provides datasets of every state's honeybee colony loss from the last eight years
            (2015 - present). We are utilizing IBM AI Technologies to help our beekeepers better
            understand what kind of statistical trends are going on, and thereby help them better
            anticipate and prepare for what's likely to happen in the future regarding their bees.
            As such, we will identify which areas beekeepers need the most help with, and give
            them exactly that. By this, we mean historical analysis and future predictions of the
            data points that matter the most to beekeepers (e.g. modeling of historical and future
            colony loss, survival rates, and honey yield) and presenting these results here at
            beemovr.com/watsonx for our users.`}
          </div>
        </div>
      </div>
    </>
  );
}
