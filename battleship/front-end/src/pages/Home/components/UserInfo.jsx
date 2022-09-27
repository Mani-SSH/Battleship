export default function UserInfo(props)
{
    return(
        <div>
        <h3>Name: { props.player.name }</h3>
        <br/>
        <h4>UID: { props.player.name.concat("#", props.player.tag) }</h4>
        <br/>
        <h3>Score: { props.player.score }</h3>
        </div>
    )
}