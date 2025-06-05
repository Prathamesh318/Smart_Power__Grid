import asyncio
import json
from kafka import KafkaConsumer
import websockets

connected_clients = set()

# WebSocket handler for new clients
async def websocket_handler(websocket):  # No 'path'
    print(f"Client connected: {websocket.remote_address}")
    connected_clients.add(websocket)
    try:
        await websocket.wait_closed()
    finally:
        print(f"Client disconnected: {websocket.remote_address}")
        connected_clients.remove(websocket)

# Kafka consumer loop running in a separate thread using executor
def kafka_consume_loop(loop):
    consumer = KafkaConsumer(
        'power-metrics',
        bootstrap_servers='localhost:9092',
        auto_offset_reset='latest',
        enable_auto_commit=True,
        group_id='power-grid-group',
        value_deserializer=lambda x: json.loads(x.decode('utf-8'))
    )
    print("Kafka consumer started on topic 'power-metrics'")
    for message in consumer:
        data = message.value
        # Send the message to all clients via the main thread
        asyncio.run_coroutine_threadsafe(send_to_clients(data), loop)

# Coroutine to send data to all clients
async def send_to_clients(data):
    if connected_clients:
        print(f"Sending to {len(connected_clients)} clients: {data}")
        await asyncio.wait([client.send(json.dumps(data)) for client in connected_clients])

async def main():
    print("Starting WebSocket server at ws://localhost:6789")
    # Start WebSocket server
    server = await websockets.serve(websocket_handler, 'localhost', 6789)

    # Start Kafka in separate thread
    loop = asyncio.get_event_loop()
    loop.run_in_executor(None, kafka_consume_loop, loop)

    await asyncio.Future()  # Run forever

if __name__ == "__main__":
    asyncio.run(main())


# import asyncio
# import websockets

# async def echo(websocket, path):
#     print("Client connected")
#     await websocket.send("Hello from server!")
#     await websocket.wait_closed()
#     print("Client disconnected")

# async def main():
#     print("Starting WebSocket server on ws://localhost:6789 l")
#     async with websockets.serve(echo, "localhost", 6789):
#         await asyncio.Future()  # Run forever

# asyncio.run(main())
