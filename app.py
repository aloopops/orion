from flask import Flask, render_template, request, jsonify
from g4f.client import Client

app = Flask(__name__)

client = Client()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message', '')

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": user_message}],
        web_search=False
    )

    bot_reply = response.choices[0].message.content
    return jsonify({'reply': bot_reply})

if __name__ == '__main__':
    app.run(debug=True)
