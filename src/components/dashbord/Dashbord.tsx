import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { useEffect } from "react";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import LoadingComponent from "../../layout/LoadingContainer";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = observer(() => {
    const { dashboardStore } = useStore();
    const { loadBestSelling, loadDailySales, bestSellingItems, dailySales, loading } = dashboardStore;

    useEffect(() => {
        loadBestSelling();
        loadDailySales();
    }, [loadBestSelling, loadDailySales]);

    if (loading) return <LoadingComponent content="Loading dashboard..." />;

    // Take only top 4 best selling items
    const topFourItems = bestSellingItems.slice(0, 4).map(item => ({
        name: item.ws_item_id,
        value: item.ws_item_quantity
    }));

    // Format daily sales data
    const formattedDailySales = dailySales.map(sale => ({
        date: new Date(sale.ws_transaction_date).toLocaleDateString(),
        amount: sale.ws_amount
    }));

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-3">Best Selling Items</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={topFourItems}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {topFourItems.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-3">Daily Sales</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart
                            data={formattedDailySales}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="amount"
                                stroke="#8884d8"
                                activeDot={{ r: 8 }}
                                name="Sales Amount"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
});

export default (Dashboard);