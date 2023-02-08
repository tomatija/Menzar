
const Order = (props) => {
    const diner = props.order.diner;
    const dish = props.order.dish;
    const soup = props.order.soup;
    
    return (
        <div>
            <h3>{diner}</h3>
            <p>{soup}</p>
            <p>{dish}</p>
            <hr></hr>
        </div>
    )
}
export default Order;