import got, { OptionsOfJSONResponseBody } from 'got'

type Headers = Record<string, string>

function GET(url: string, queryParams: URLSearchParams = new URLSearchParams()) {
    const requestURL = `${url}?${queryParams}`
    const options: OptionsOfJSONResponseBody = {
        responseType: 'json',
    }
    return got.get(requestURL, options)
}

function POST(url: string, body: object, headers: Headers) {
    const options: OptionsOfJSONResponseBody = {
        body: JSON.stringify(body),
        responseType: 'json',
        headers: headers,
    }
    return got.post(url, options)
}

export { GET, POST }
