import React from 'react'
import Header from '../../components/Header';
import './index.styles.css'
export default function SkuDetail({ store }) {
  console.log(store);
  const convert = (store) => {
    const res = {};
    store.forEach((obj) => {
      const key = `${obj.sku}${obj["currScan"]}`;
      if (!res[key]) {
        res[key] = { ...obj, qty: 0 };
      };
      res[key].qty += 1;
    });
    return Object.values(res);
  };
  const skuQuantity = convert(store);
  console.log(skuQuantity);
  return (
    <div>
      <Header title="Sku Details" />
      <div className='tableDiv'>
        <table class="table w-50">
          <thead>
            <tr>
              <th scope="col">Sku</th>
              <th scope="col">Quantity</th>
            </tr>
          </thead>
          {skuQuantity.map((res, i) => (
            <tbody>
              <tr>
                <td>{res.sku}</td>
                <td>{res.qty}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  )
}
