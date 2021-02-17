import json
from random import randrange, random
from bottle import route, run, static_file
from faker import Faker

file = open('drivers.get.json', 'w+')
file.write("[]")


# generate fake driver profile
def genobj():
    fake = Faker()
    try:
        o = json.loads(open("drivers.get.json", "r").read())
    except:
        o = []
    d = {
        "driverName": fake.name(),
        "driverCityOrigin": fake.city(),
        "driverLanguage": ['de', 'en', 'nl', 'fr', 'es', 'ar'][randrange(6)],
        "driverPhone": fake.phone_number(),
        'driverInfo': fake.catch_phrase(),
        "licensePlate": fake.license_plate(),
        "kmDriven": int(random() * 100000),
        'location': [str(fake.latitude()), str(fake.longitude())]
    }
    o.append(d)
    file = open("./drivers.get.json", "w")
    file.write(json.dumps(o))


# generate 10 fake drivers
genobj()
genobj()
genobj()
genobj()
genobj()
genobj()
genobj()
genobj()
genobj()
genobj()


# TODO randomly update driver location every 5 seconds


@route('/')
def serve_static(file_path="index.html"):
    return static_file(file_path, root='./app/')


@route('/drivers')
def get_cars():
    return open("./drivers.get.json", "r").read()


run(host='localhost', port=8080, debug=True)
