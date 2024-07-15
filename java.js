import encoding from 'k6/encoding';
import http from 'k6/http';
import { check, sleep } from 'k6';

const username = "user";
const password = "pass";
const portalUrl = "link";

//DODATKOWE
export const options = {
    vus: 1,
    duration: '1s',
};

export function setup(){
  const credentials = `${username}:${password}`;
  const encodedCredentials = encoding.b64encode(credentials);
  const url = `https://${credentials}@tlink${username}/${password}`;

  const params = {
    headers: {
        'Authorization': `Basic ${encodedCredentials}`
    }
};

let res = http.get(portalUrl, params);
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}

//INTERPRETOWANIE DO JSONA
export function pobranie(){
  let link = http.get('url');

  check(link, {
    'status is 200': (r) => r.status === 200,
  });

  let jsonResponse = link.json();

  for(let item of jsonResponse){
    console.log(`ID: ${item.id}, Value: ${item.value}`);
  }
}

export default function () {
    // GET #1
    let response1 = http.get('http://test.k6.io');

    // CHECK #1
    check(response1, {
        'response1 status 200': (r) => r.status === 200,
    });

    // GET #2
    let response2 = http.get('link');

    // CHECK #2
    let success = check(response2, {
        'response2 status 200': (r) => r.status === 200,
    });

    // Handle errors
    if (!success) {
        console.error(`Error: ${response2.status}`);
    }

    // Process response if successful
    if (response2.status === 200) {
        let data = response2.json();
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                console.log(`${key}: ${data[key]}`);
            }
        }
    }

    sleep(1);
}

/*
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1s', vus: 20 },
    { duration: '2s', vus: 10 },
    { duration: '3s', vus: 1 },
  ],
};

export default function () {
  //GET
  http.get('http://test.k6.io');

  //const RESPONSE
  const response = http.get('link');

  //CHECK RESPONSE
  check(response, {
    'response status 200': (r) => r.status == 200,
  });
  sleep(1);
}

import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1s', vus: 20 },
    { duration: '2s', vus: 10 },
    { duration: '3s', vus: 0 },
  ],
};

export default function () {
  const res = http.get('https://httpbin.test.k6.io/');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
*/