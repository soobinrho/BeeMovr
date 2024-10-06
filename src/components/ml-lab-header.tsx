import Link from 'next/link';

export default function MLLabHeader() {
  return (
    <div className='absolute left-[47%] top-0 mx-5 my-8 flex translate-x-[-50%] flex-row whitespace-nowrap text-3xl text-font-console sm:left-[50%]'>
      <Link
        href='/'
        className='font-black drop-shadow-sm hover:text-cyan-200 hover:drop-shadow-md active:text-cyan-300'
      >
        BeeMovr
      </Link>
      <span className='mx-3 font-extralight'>ML Lab</span>
    </div>
  );
}
