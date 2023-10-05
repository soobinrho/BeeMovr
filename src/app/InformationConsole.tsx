export default function InformationConsole() {
  return (
    <div className='absolute left-0 bottom-0 mx-5 my-10 z-10'>
      <b>Test value</b> {process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN} <br />
      <b>Test value</b> {process.env.NODE_ENV}
    </div>
  );
}
