import React, { useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { useOutletContext } from 'react-router';
import { useSelector } from 'react-redux';
import { capitalizeWords } from '../../Functions/functions';

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
  const { products, categories } = useOutletContext()
  const admin = useSelector((state) => state.AirWheel.users)
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Sales',
        backgroundColor: '#4f46e5',
        data: [3000, 5000, 4000, 6000, 7000],
      },
    ],
  };

  const arr = [categories && categories.map((item) => capitalizeWords(item.name))]


  const countProductsByCategory = (products, categories) => {
    const categoryCount = new Map();

    // Initialize count to 0 for each category
    categories &&  categories.forEach(cat => categoryCount.set(cat.name, 0));

    // Count products under each category
    products && products.forEach(product => {
      if (categoryCount.has(product.category)) {
        categoryCount.set(product.category, categoryCount.get(product.category) + 1);
      }
    });

    // Convert to array format
    return Array.from(categoryCount.entries()).map(([category, count]) => ({ category, count }));
  };
  const generateColors = (count) => {
    return Array.from({ length: count }, (_, i) => `hsl(${(i * 360) / count}, 70%, 60%)`);
  };

  const pieData = {
    labels: categories?.map((item) => capitalizeWords(item.name)),
    datasets: [
      {
        data: countProductsByCategory(products, categories)?.map(item => item.count),
        backgroundColor: categories?.length ? generateColors(categories.length) : [],
      },
    ],
  };

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen w-full">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-gray-500">Total Products</h2>
          <p className="text-2xl font-bold">{products?.length}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-gray-500">Categories</h2>
          <p className="text-2xl font-bold">{categories?.length}</p>
        </div>
        {/* <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-gray-500">Orders</h2>
          <p className="text-2xl font-bold">587</p>
        </div> */}
        <div className="bg-white shadow md:w-[450px]  rounded-xl p-5">
          <h2 className="text-gray-500">{admin?.role == 'admin' ? ('Admin') : ('Sub Admin')}</h2>
          <p className="md:text-xl font-bold">Name : {admin?.name}</p>
          <p className="md:text-xl font-bold"> Employee ID: {admin?.employee_id}</p>

        </div>
      </div>

      {/* Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-3">Monthly Sales</h2>
          <Bar data={barData} />
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-3">Product Category Distribution</h2>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
