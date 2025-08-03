# Chat_Isi
Возможно у вас не создадуться директории data и uploads, в таком случае создайте их в ручную
## Запуск на Arch Linux

sudo pacman -Sy  # обновить базы пакетов (аналог apt update)
sudo pacman -S python python-virtualenv python-pip  # установить Python и необходимые пакеты

cd ~/anon_chat
python -m venv venv           # создаём виртуальное окружение (если создано — пропускаем)
source venv/bin/activate      # активируем виртуальное окружение
pip install flask             # устанавливаем Flask внутри окружения (если не установлен)
python app.py                 # запускаем сервер

##Запуск на Ubuntu

sudo apt update
sudo apt install python3 python3-venv python3-pip  # устанавливаем зависимости, если нужно

cd ~/anon_chat
python3 -m venv venv           # создаём виртуальное окружение (если создано — пропускаем)
source venv/bin/activate       # активируем виртуальное окружение
pip install flask              # устанавливаем Flask внутри окружения (если не установлен)
python3 app.py                 # запускаем сервер

##Запуск на Windows (через cmd или PowerShell)

cd C:\Users\ваше_имя\anon_chat
python -m venv venv               # создаём виртуальное окружение
venv\Scripts\activate             # активируем виртуальное окружение
pip install flask                 # устанавливаем Flask
python app.py                     # запускаем сервер

### Запуск на Windows (Простой)

1. Открой PyCharm
    Запусти PyCharm.
    Выбери: File → Open... и укажи папку проекта (например, Chat_Isi).
2. Создай виртуальное окружение
    PyCharm сам предложит создать виртуальное окружение при первом запуске проекта.
    Или настрой вручную:
        File → Settings → Python Interpreter.
        Нажми ⚙️ → Add... → Virtualenv Environment.
        Выбери:
            New environment → путь: venv в папке проекта.
            Базовый интерпретатор: укажи путь к Python (python.exe).
        Нажми OK — окружение создастся и привяжется.
3. Установи Flask
    Перейди в File → Settings → Python Interpreter.
    Нажми +, найди Flask, нажми Install Package.
Или:
    Открой встроенный терминал (внизу IDE):
    python -m pip install flask
4. Запусти app.py 
