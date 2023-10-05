export default function InformationConsole() {
  return (
    <div className='absolute bottom-0 left-0 z-10 mx-5 my-10'>
      <b>Test value</b> {process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN} <br />
      <b>Test value</b> {process.env.NODE_ENV}
    </div>
  );
}
