import json
from random import randrange, random
from bottle import route, run, static_file
from faker import Faker
import threading

file = open('drivers.get.json', 'w+')
file.write("[]")

# generate fake driver profile using Driver class and Faker library
fake = Faker()


class Driver:
    def __init__(self):
        self.name = fake.name()
        self.cityOrigin = fake.city()
        self.language = ['de', 'en', 'nl', 'fr', 'es', 'ar'][randrange(6)]
        self.phone = fake.phone_number()
        self.info = fake.catch_phrase()
        self.licensePlate = fake.license_plate()
        self.kmDriven = int(random() * 100000)
        self.location = [str(fake.latitude()), str(fake.longitude())]

    def update_location(self):
        self.location = [str(fake.latitude()), str(fake.longitude())]


# generating 10 drivers based on the Driver class
drivers = list()
for i in range(10):
    drivers.append(Driver())


# write drivers into json file
def initializejson(drivers):
    try:
        print('here')
        o = json.loads(open("drivers.get.json", "r").read())
    except:
        print('there')
        o = []
    for driver in drivers:
        d = {
            "driverName": driver.name,
            "driverCityOrigin": driver.cityOrigin,
            "driverLanguage": driver.language,
            "driverPhone": driver.phone,
            'driverInfo': driver.info,
            "licensePlate": driver.licensePlate,
            'location': [str(driver.location[0]), str(driver.location[1])]
        }
    o.append(d)
    file = open("./drivers.get.json", "w")
    file.write(json.dumps(o))


initializejson(drivers)


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


# TODO randomly update driver location every 5 seconds
def updatedrivers():
    threading.Timer(5.0, updatedrivers).start()  # called every minute
    print(drivers[0].name)
    print(drivers[0].location)

    for driver in drivers:
        driver.update_location()


updatedrivers()


# Routing
@route('/')
def serve_static(file_path="index.html"):
    return static_file(file_path, root='./app/')


@route('/drivers')
def get_cars():
    return open("./drivers.get.json", "r").read()


run(host='localhost', port=8080, debug=True)
