function CartAggregator(props) {
  return (
    <div className='sidebar-group'>
      {props.cartItems.length > 0 &&
      <p style={{fontWeight:'600', fontSize:'2vmin', color:'rgb(222, 184, 177)'}}>Cart Total: ${props.cartItems.map((item) => item.price).reduce((accumulator, currentValue) => accumulator + currentValue)}</p>
      } 
      {props.cartItems.length === 0 &&
      <p style={{fontWeight:'600', fontSize:'2vmin', color:'rgb(222, 184, 177)'}}>Cart Total: $0.00</p>
      }

    </div>
    
  );
}

export default CartAggregator;