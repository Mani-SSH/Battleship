import Button from "react-bootstrap/esm/Button";

export default function Play() {
    return (
        <>
            <Button>Play</Button>

            <JoinRoom
            show={ showJoinRoom }
            onHide={ handleCloseJoinRoom }
            onCancel={ handleCancel }
            />
        </>
    )
}