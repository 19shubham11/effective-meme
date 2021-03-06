interface GIPHYResponse {
    data: GIPHYData
}

interface GIPHYData {
    type: string
    id: string
    url: string
    title: string
}

export { GIPHYResponse }
