# Chat_Isi

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
