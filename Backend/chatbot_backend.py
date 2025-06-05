from flask import Flask, request, jsonify
from flask_cors import CORS
from huggingface_hub import InferenceClient

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

client = InferenceClient(
    model="deepseek-ai/DeepSeek-R1-0528",
    token="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"
)

def clean_think_content(text):
    # Remove anything between <think>...</think> tags including the tags
    import re
    return re.sub(r"<think>.*?</think>\s*", "", text, flags=re.DOTALL)

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message", "")
    if not user_message:
        return jsonify({"reply": "Please enter a valid message."}), 400

    try:
        response = client.chat.completions.create(
            messages=[{"role": "user", "content": user_message}],
        )

        full_reply = response.choices[0].message.content.strip()
        clean_reply = clean_think_content(full_reply)

        return jsonify({"reply": clean_reply})
    except Exception as e:
        return jsonify({"reply": f"Error: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5001)
