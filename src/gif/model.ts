interface GIPHYResponse {
    data: GIPHYData
}

interface GIPHYData {
    type: string
    id: string
    image_original_url: string
    title: string
}

export { GIPHYResponse }
