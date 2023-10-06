export default function InformationConsole() {
  return (
    <div className='hover:bg-background-space/80 absolute bottom-0 left-0 z-10 mx-2 my-8 p-3'>
      {/* <div className=' z-10 m-2 p-3'></div> */}
      <b>Test value</b> {process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN} <br />
      <b>Test value</b> {process.env.NODE_ENV}
    </div>
  );
}
