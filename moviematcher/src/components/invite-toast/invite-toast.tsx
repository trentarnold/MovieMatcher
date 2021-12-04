import React, { ReactText } from 'react';
import { useAppSelector } from '../../redux/app/hooks';
import { selectSocketRef } from '../../redux/features/socket/socketRefSlice'
import { Button } from '@chakra-ui/button';
import './invite-toast.css';
import { toast } from 'react-toastify'
type Props = {
    room: string,
    toastRef: ReactText,
}


const InviteToast:React.FC<Props> = ({toastRef, room}) => {
    const socket = useAppSelector(selectSocketRef);

    const handleAcceptInvite = () => {
        socket.emit('accepted', room);
        toast.dismiss(toastRef)
    }

    const handleDenyInvite = () => {
        socket.emit('denied', room);
        toast.dismiss(toastRef)
    }
    return (
        <div className="invite-toast">
            <p>You've been invited to a match in room {room}</p>
            <Button onClick={handleAcceptInvite}>Accept</Button>
            <Button onClick={handleDenyInvite}>Deny</Button>
        </div>
    )
}

export default InviteToast
