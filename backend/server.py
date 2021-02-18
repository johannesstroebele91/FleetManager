import os, json
from random import randrange, random
from bottle import route, run, static_file
from faker import Faker
import threading

# initialize instance of Faker class to create fake data for drivers
fake = Faker()


# giver class with constructor and update location function
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
file = open('drivers.get.json', 'w+')
file.write("[]")
file.close()


def updatejson(driver):
    try:
        o = json.loads(open("drivers.get.json", "r").read())
    except:
        o = []
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
    file.close()


for driver in drivers:
    updatejson(driver)

# Randomly update the location of the drivers every 5 seconds
def updatedrivers():
    os.remove("drivers.get.json")
    file = open('drivers.get.json', 'w+')
    file.write("[]")
    file.close()

    threading.Timer(5.0, updatedrivers).start()  # called every minute

    for driver in drivers:
        driver.update_location()

    for driver in drivers:
        updatejson(driver)

updatedrivers()

# Routing
@route('/')
def serve_static(file_path="index.html"):
    return static_file(file_path, root='./app/')


@route('/drivers')
def get_cars():
    return open("./drivers.get.json", "r").read()


file.close()
run(host='localhost', port=8080, debug=True)
