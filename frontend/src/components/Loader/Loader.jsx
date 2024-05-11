import IconButton from '@mui/joy/IconButton';
function Loader() {
  return (
    <div style={{position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh', zIndex: 999999, backgroundColor: '#00000079', backdropFilter: 'blur(5px)', display: 'grid', placeItems: 'center'}}>
        <IconButton loading size='lg' color='primary'/>
    </div>
  )
}

export default Loader