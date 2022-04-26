import http from 'http';
import fs from 'fs';
import requests from 'requests';
const homeFile = fs.readFileSync('../index.html', 'utf-8');
const replaceVal = (tempVal, orgVal) => {

    let temperature = tempVal.replace('{%tempval%}', convertToCentigrade(orgVal.main.temp));
    temperature = temperature.replace('{%tempmin%}', convertToCentigrade(orgVal.main.temp_min));
    temperature = temperature.replace('{%tempmax%}', convertToCentigrade(orgVal.main.temp_max));
    temperature = temperature.replace('{%city%}', (orgVal.name));
    temperature = temperature.replace('{%country%}', (orgVal.sys.country));
    temperature = temperature.replace('{%tempstatus%}', (orgVal.weather[0].main));
    return temperature;


}

function convertToCentigrade(apiTem) {
    const convertedTemp = apiTem - 273.15;
    return convertedTemp.toFixed(2);
}
const server = http.createServer((req, res) => {
    if (req.url == '/') {
        requests('https://api.openweathermap.org/data/2.5/weather?q=London&callback=&appid=5064e39e4c4a34352a4691eda2db2627', )
            .on('data', (chunkdata) => {
                const objData = JSON.parse(chunkdata);
                const arrayData = [objData];
                // console.log(arrayData[0].main.temp);
                const realTimeData = arrayData.map(val =>
                    replaceVal(homeFile, val)
                ).join('');
                res.write(realTimeData)
                console.log(realTimeData);
            })
            .on('end', (err) => {
                if (err) {
                    return console.log('connection closed due to error');
                }
                res.end()
            });
    }

});
server.listen(8000, '127.0.0.1', () => {
    console.log('listen to port 8000');
});