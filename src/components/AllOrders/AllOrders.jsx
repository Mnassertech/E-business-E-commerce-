import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/cartContext";
import { tokenContext } from "../../Context/tokenContext";
import { jwtDecode } from "jwt-decode";
export default function AllOrders() {
  let { getUserOrders } = useContext(cartContext);
  let { token } = useContext(tokenContext);
  const [orders, setOrders] = useState([]);
  function getId() {
    let decoded = jwtDecode(token);
    console.log(decoded, "heeloooo");
    getOrders(decoded.id);
  }
  async function getOrders(id) {
    let data = await getUserOrders(id);
    console.log(data);
    setOrders(data);
  }
  useEffect(() => {
    token && getId();
  }, [token]);

  return (
    <>
      <div className="relative my-12 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order ID
              </th>
              <th scope="col" className="px-6 py-3">
                is Paid
              </th>
              <th scope="col" className="px-6 py-3">
                Payment Method Type
              </th>
              <th scope="col" className="px-6 py-3">
                Total Order Price
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {order.id}
                </th>
                <td className="px-6 py-4">{order.isPaid ?'Paid':'Not Paid'}</td>
                <td className="px-6 py-4">{order.paymentMethodType}</td>
                <td className="px-6 py-4">{order.totalOrderPrice} EGP</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
