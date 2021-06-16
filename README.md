# Metric-Imperial-Converter
 API service to convert metric/imperial measurements

### Purpose:
Practice implementing unit and integrated Mocha Chai-HTTP testing.

### Usage:
```
/api/convert?input=4gal
```
```
/api/convert?input=1/2km
```
```
/api/convert?input=5.4/3lbs
```
```
/api/convert?input=kg
```

### Example return:
```
{ initNum: 3.1, initUnit: 'mi', returnNum: 4.98895, returnUnit: 'km', string: '3.1 miles converts to 4.98895 kilometers' }
```
