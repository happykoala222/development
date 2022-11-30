import { Card } from 'antd';
import { useState } from 'react';
import { Button } from 'antd';

function RingItem(props) {
  const { Meta } = Card;
  const [inCart, setInCart] = useState(false)

  const handleAddToCart = () => {
    setInCart(!inCart)
    props.setCartItems([...props.cartItems, props.item]);
    console.log([...props.cartItems, props.item])
  };

  const handleRemoveFromCart = () => {
    setInCart(!inCart)
    props.setCartItems([...props.cartItems, props.item].filter((item) => item.name !== props.item.name));
    console.log('removed: ', [...props.cartItems, props.item].filter((item) => item.name !== props.item.name))
  };

  return (
      <Card
        hoverable
        style={{ width: 300, backgroundColor: '#f6f6f6', fontFamily: 'Syne' }}
        cover={<img alt="example" src={props.item.image} style={{maxHeight:'300px'}}/>}
      >
        <Meta
          title={props.item.name}
          description={props.item.material}
        />
        <div className="additional">
          <p>Style: {props.item.style}</p>
          <p  className="price">${props.item.price}</p>
          {props.cartItems.includes(props.item) &&
          <Button type="primary" style={{color:'#371b15', backgroundColor:'#deb8b1'}} onClick={() => handleRemoveFromCart()}>Remove from Cart</Button>
          }
          {!props.cartItems.includes(props.item) &&
          <Button type="primary" style={{color:'white', backgroundColor:'#332f2f'}} onClick={() => handleAddToCart()}>Add to Cart</Button>
          }
        </div>
      </Card>
  );
}

export default RingItem;