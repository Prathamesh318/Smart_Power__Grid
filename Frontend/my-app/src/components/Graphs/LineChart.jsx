import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const RealTimeLineChart = ({ dataItem }) => {
    const [data, setData] = useState([]);


    //When backend is ready use this code
    // useEffect(() => {
    //     const socket = new WebSocket("ws://your-backend-websocket-url");

    //     socket.onmessage = (event) => {
    //         const newDataPoint = JSON.parse(event.data);
    //         setData((prevData) => [...prevData.slice(-19), newDataPoint]); // Keep only last 20 points
    //     };

    //     return () => socket.close();
    // }, []);

    useEffect(() => {
        // Simulating real-time data updates
        const interval = setInterval(() => {
            const newDataPoint = {
                timestamp: new Date().getTime(),
                [dataItem]: Math.random() * 100 // Random data for testing
            };
            setData((prevData) => [...prevData.slice(-19), newDataPoint]); // Keep only last 20 points
        }, 1000);

        return () => clearInterval(interval);
    }, [dataItem]);

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" tickFormatter={(tick) => new Date(tick).toLocaleTimeString()} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey={dataItem} stroke="#8884d8" strokeWidth={2} dot={false} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default RealTimeLineChart;