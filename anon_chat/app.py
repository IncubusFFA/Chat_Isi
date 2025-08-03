import os
from flask import Flask, render_template, request, jsonify, send_from_directory
from datetime import datetime
import json
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['DATA_FOLDER'] = 'data'

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/chat')
def chat():
    return render_template('index.html', rooms=CHAT_ROOMS)


# Создадим папки, если не существует
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
os.makedirs(app.config['DATA_FOLDER'], exist_ok=True)

CHAT_ROOMS = ['главная', 'мемы', 'другое', 'tests']

def get_chat_file(room):
    return os.path.join(app.config['DATA_FOLDER'], f"{room}.json")

def load_messages(room):
    path = get_chat_file(room)
    if not os.path.exists(path):
        return []
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_messages(room, messages):
    path = get_chat_file(room)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(messages, f, ensure_ascii=False, indent=2)

@app.route('/')
def index():
    return render_template('index.html', rooms=CHAT_ROOMS)

@app.route('/messages/<room>')
def get_messages(room):
    if room not in CHAT_ROOMS:
        return jsonify({"error": "Неверный чат"}), 400
    messages = load_messages(room)
    return jsonify(messages[-500:])  # последние 500 сообщений

@app.route('/post/<room>', methods=['POST'])
def post_message(room):
    if room not in CHAT_ROOMS:
        return jsonify({"error": "Неверный чат"}), 400

    # Для поддержки file upload
    name = request.form.get('name', 'Аноним')[:20]
    text = request.form.get('text', '').strip()[:1000]
    file = request.files.get('file', None)

    img_url = None
    if file and file.filename:
        filename = secure_filename(file.filename)
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        filename = f"{timestamp}_{filename}"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        img_url = f"/uploads/{filename}"

    if not text and not img_url:
        return jsonify({"error": "Пустое сообщение"}), 400

    messages = load_messages(room)

    messages.append({
        'name': name or "Аноним",
        'text': text,
        'img_url': img_url,
        'time': datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    })

    save_messages(room, messages)

    return jsonify(success=True)

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)