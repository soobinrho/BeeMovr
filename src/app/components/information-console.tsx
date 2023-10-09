export default function InformationConsole() {
  return (
    <div className='absolute bottom-4 z-10 w-screen'>
      <div className='mx-2 my-12 flex flex-col-reverse justify-self-start overflow-x-auto rounded-md bg-background-console/50 p-5 text-left font-semibold text-font-console hover:mx-0 hover:rounded-none hover:bg-background-console/90 hover:px-7 sm:my-5'>
        <p>
          <b>Test value</b> {process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN} <br />
          <b>Test value</b> {process.env.NEXT_PUBLIC_URL} <br />
          <b>Test value</b> {process.env.NODE_ENV}
        </p>
      </div>
    </div>
  );
}
