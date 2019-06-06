env:
	virtualenv env -p python3.7

install: env
	env/bin/pip install -r requirements.txt

default: env install

start:
	env/bin/python app.py &
