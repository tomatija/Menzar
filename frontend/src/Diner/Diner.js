const diner = (props) => {
    return (
        <div className="Diner">
            <a href={props.name}>{props.display_name}</a>
        </div>
        )
}

export default diner;