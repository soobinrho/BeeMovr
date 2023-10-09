export default function Searchbox() {
  return (
    <div className='absolute start-0 z-10 ml-4 mt-6 flex w-[28%] flex-auto flex-grow translate-x-0 flex-row flex-nowrap items-center gap-0 pl-3 pt-1 sm:start-[50%] sm:ml-5 sm:mt-7 sm:translate-x-[-50%] sm:pt-0'>
      <div className='start-0 z-10 translate-x-0 text-white/50 sm:start-[50%] sm:translate-x-[-50%]'>
        <svg
          className='fill-current text-font-console hover:text-gray-400 active:text-gray-500'
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
        >
          <path d='M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z' />
        </svg>
      </div>

      <input
        id='searchbox'
        type='text'
        className='invisible z-10 w-[100%] self-stretch rounded-3xl border-none bg-background-console/50 text-left font-semibold placeholder-font-console/90 hover:border-none hover:bg-background-console/90 hover:text-white focus:border-none focus:text-white focus:ring-0 sm:visible'
        required
        placeholder='Search...'
        onKeyDown={(evt) => {
          if (evt.key === 'Enter') {
            console.log('yes');
          }
        }}
      ></input>
    </div>
  );
}
