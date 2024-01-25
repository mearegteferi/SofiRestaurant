// OrderList.js

import React, { useState } from "react";
import Footer from "../component/Footer";

const Orders = () => {
  // Dummy data for orders with customer information
  const orders = [
    {
      id: 1,
      dish: "Pizza Margherita",
      quantity: 2,
      status: "In Progress",
      table: 5,
      totalPrice: 25.99,
      customer: {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "555-1234",
      },
    },
    {
      id: 2,
      dish: "Chicken Alfredo Pasta",
      quantity: 1,
      status: "Completed",
      table: 3,
      totalPrice: 15.5,
      customer: {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "555-5678",
      },
    },
    {
      id: 3,
      dish: "Grilled Salmon",
      quantity: 3,
      status: "Pending",
      table: 8,
      totalPrice: 45.75,
      customer: {
        name: "Bob Johnson",
        email: "bob.johnson@example.com",
        phone: "555-9101",
      },
    },
  ];

  const [editableStatus, setEditableStatus] = useState("");

  const handleStatusChange = (orderId, newStatus) => {
    // Add your logic here to update the status in your data or API
    console.log(`Order ${orderId} status changed to ${newStatus}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto mt-8 flex-grow mb-8">
        <h1 className="text-3xl font-semibold mb-4">Orders</h1>
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={order.id}
              className="flex bg-white text-black p-6 rounded-md shadow-md space-x-6 mb-8"
            >
              <div className="flex flex-col flex-shrink-0">
                <div className="flex flex-col flex-shrink-0">
                  <h2 className="text-xl font-semibold mb-2">
                    Customer Information
                  </h2>
                  <p className="text-black">Name: {order.customer.name}</p>
                  <p className="text-black">Email: {order.customer.email}</p>
                  <p className="text-black">Phone: {order.customer.phone}</p>
                </div>
                </div>
                <div>
                <h2 className="text-xl font-semibold mb-2">Food List</h2>
                <p className="text-black">Dish: {order.dish}</p>
              </div>
              <div className="flex flex-col flex-shrink-0">
                <h2 className="text-xl font-semibold mb-2">Price</h2>
                <p className="text-black">Quantity: {order.quantity}</p>
                <p className="text-black">
                  Total Price: ${order.totalPrice.toFixed(2)}
                </p>
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold mb-2">Status</h2>
                <div className="flex items-center space-x-2">
                  <p className="text-white">{order.status}</p>
                  <div className="relative">
                    <select
                      className="text-gray-800 bg-white rounded-md px-3 py-1 outline-none"
                      onChange={(e) => setEditableStatus(e.target.value)}
                    >
                      <option value="" disabled selected hidden>
                        Edit Status
                      </option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Pending">Pending</option>
                    </select>
                    {editableStatus && (
                      <button
                        className="absolute top-0 right-0 text-white px-2 py-1"
                        onClick={() =>
                          handleStatusChange(order.id, editableStatus)
                        }
                      >
                        Save
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
