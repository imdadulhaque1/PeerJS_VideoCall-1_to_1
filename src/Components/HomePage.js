import Peer from 'peerjs';
import React, {useState, useRef, useEffect} from 'react'

const HomePage = () => {
    const [peerId, setPeerId] = useState('');
    const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
    const remoteVideoRef = useRef(null);
    const currentUserVideoRef = useRef(null);
    const peerInstance = useRef(null);

    useEffect(() => {
        const peer = new Peer();
        peer.on('open', (id) => {
            setPeerId(id);
        })

        peer.on('call', (call) =>{
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            getUserMedia({video:true, audio:true}, (mediaStream) =>{
                currentUserVideoRef.current.srcObject = mediaStream;
                currentUserVideoRef.current.play();
                call.answer(mediaStream)
                call.on('stream', function(remoteStream){
                    remoteVideoRef.current.srcObject = remoteStream
                    remoteVideoRef.current.play();
                })
            })
        })

        peerInstance.current = peer;
    }, [])

    

    return (
        <div>
            <p> Current User Id Is: <b>{peerId}</b> </p>
            <input type="text" value={remotePeerIdValue} onChange={e => setRemotePeerIdValue(e.target.value)} />
            <button onClick={() => call(remotePeerIdValue)}>Call</button>
            <div>
                <video ref={currentUserVideoRef} />
            </div>
            <div>
                <video ref={remoteVideoRef} />
            </div>
        </div>
    )
}

export default HomePage;
