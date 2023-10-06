export default function InformationConsole() {
  return (
    <div className='invisible absolute bottom-4 z-10 w-screen sm:visible'>
      <div className='text-font-console bg-background-console/60 hover:bg-background-console/90 mx-2 my-5 flex flex-col-reverse justify-self-start rounded-md p-5 text-left font-semibold'>
        <p>
          <b>Test value</b> {process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN} <br />
          <b>Test value</b> {process.env.NODE_ENV}
        </p>
        <p>
          <b>Test value 2</b> {process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN} <br />
          <b>Test value 2</b> {process.env.NODE_ENV}
        </p>
      </div>
    </div>
  );
}
