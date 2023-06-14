const Cart = ({ cart }) => {
  return (
    <div className="listItems">
      <h2>MY CART</h2>
        <table>
          <thead>
            <tr>
              <th>
                  #
              </th>
              <th>
                  Item Name
              </th>
              <th>
                  Unit Price
              </th>
              <th>
                  No of Items
              </th>
              <th>
                Sub Total
              </th>
            </tr>
          </thead>
          <tbody>
          { cart.length > 0 ? 
            cart.map((cartItem, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{cartItem.itemName}</td>
                  <td>{cartItem.unitPrice}</td>
                  <td>{cartItem.noOfItems}</td>
                  <td>{cartItem.subTotal}</td>
                </tr>
              )
            }) : <tr className="noItems"><td>No items added</td></tr>
          }
         </tbody>
        </table>
      </div>
  )
}

export default Cart;